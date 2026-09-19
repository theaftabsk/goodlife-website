import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRedirectDto, UpdateRedirectDto } from './dto/create-redirect.dto';

@Injectable()
export class RedirectsService {
  private readonly logger = new Logger(RedirectsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      let redirects = await this.prisma.redirect.findMany({
        orderBy: { createdAt: 'desc' },
      });

      // If empty, auto-seed default enterprise redirect rules
      if (redirects.length === 0) {
        const defaultRules = [
          { fromUrl: '/services', toUrl: '/capabilities/marketplace-operations', statusCode: 301, clicks: 124 },
          { fromUrl: '/contact-us', toUrl: '/contact', statusCode: 301, clicks: 88 },
          { fromUrl: '/solutions/scale', toUrl: '/solutions/scale-pan-india', statusCode: 301, clicks: 43 },
        ];

        for (const rule of defaultRules) {
          await this.prisma.redirect.create({ data: rule }).catch(() => null);
        }

        redirects = await this.prisma.redirect.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }

      // Format for frontend compatibility
      return redirects.map((r) => ({
        id: r.id,
        from: r.fromUrl,
        fromUrl: r.fromUrl,
        to: r.toUrl,
        toUrl: r.toUrl,
        code: r.statusCode,
        statusCode: r.statusCode,
        clicks: r.clicks,
        createdAt: r.createdAt,
      }));
    } catch (error) {
      this.logger.error('Failed to get redirects from database', error);
      throw error;
    }
  }

  async getOne(id: string) {
    const redirect = await this.prisma.redirect.findUnique({
      where: { id },
    });
    if (!redirect) throw new NotFoundException(`Redirect rule with ID ${id} not found`);
    return {
      id: redirect.id,
      from: redirect.fromUrl,
      to: redirect.toUrl,
      code: redirect.statusCode,
      clicks: redirect.clicks,
      createdAt: redirect.createdAt,
    };
  }

  async create(dto: CreateRedirectDto) {
    let fromUrl = dto.from.trim();
    if (!fromUrl.startsWith('/') && !fromUrl.startsWith('http')) {
      fromUrl = `/${fromUrl}`;
    }
    const toUrl = dto.to.trim();
    const statusCode = Number(dto.code) || 301;

    try {
      const existing = await this.prisma.redirect.findUnique({
        where: { fromUrl },
      });
      if (existing) {
        throw new ConflictException(`Redirect rule already exists for source path "${fromUrl}"`);
      }

      const created = await this.prisma.redirect.create({
        data: {
          fromUrl,
          toUrl,
          statusCode,
          clicks: 0,
        },
      });

      this.logger.log(`Created redirect rule: ${fromUrl} -> ${toUrl} (${statusCode})`);
      return {
        id: created.id,
        from: created.fromUrl,
        to: created.toUrl,
        code: created.statusCode,
        clicks: created.clicks,
        createdAt: created.createdAt,
      };
    } catch (error) {
      this.logger.error('Failed to create redirect rule', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateRedirectDto) {
    const existing = await this.prisma.redirect.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Redirect rule with ID ${id} not found`);

    let fromUrl = dto.from ? dto.from.trim() : existing.fromUrl;
    if (fromUrl && !fromUrl.startsWith('/') && !fromUrl.startsWith('http')) {
      fromUrl = `/${fromUrl}`;
    }

    const toUrl = dto.to ? dto.to.trim() : existing.toUrl;
    const statusCode = dto.code ? Number(dto.code) : existing.statusCode;
    const clicks = dto.clicks !== undefined ? Number(dto.clicks) : existing.clicks;

    try {
      const updated = await this.prisma.redirect.update({
        where: { id },
        data: {
          fromUrl,
          toUrl,
          statusCode,
          clicks,
        },
      });

      return {
        id: updated.id,
        from: updated.fromUrl,
        to: updated.toUrl,
        code: updated.statusCode,
        clicks: updated.clicks,
        createdAt: updated.createdAt,
      };
    } catch (error) {
      this.logger.error(`Failed to update redirect rule with ID ${id}`, error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.prisma.redirect.delete({
        where: { id },
      });
      return { success: true, id: deleted.id };
    } catch (error) {
      this.logger.error(`Failed to delete redirect rule with ID ${id}`, error);
      throw error;
    }
  }

  async recordHit(id: string) {
    try {
      const updated = await this.prisma.redirect.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      });
      return { success: true, clicks: updated.clicks };
    } catch (error) {
      this.logger.error(`Failed to increment clicks for redirect ${id}`, error);
      throw error;
    }
  }

  async resolve(path: string) {
    let cleanPath = path.trim();
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;

    const match = await this.prisma.redirect.findUnique({
      where: { fromUrl: cleanPath },
    });

    if (match) {
      // Async increment hit counter
      this.prisma.redirect.update({
        where: { id: match.id },
        data: { clicks: { increment: 1 } },
      }).catch(() => null);

      return {
        matched: true,
        from: match.fromUrl,
        to: match.toUrl,
        code: match.statusCode,
      };
    }

    return { matched: false };
  }
}
