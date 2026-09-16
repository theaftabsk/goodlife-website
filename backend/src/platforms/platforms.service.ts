import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.platformLogo.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.platformLogo.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findOne(id: string) {
    const platform = await this.prisma.platformLogo.findUnique({ where: { id } });
    if (!platform) throw new NotFoundException('Platform not found');
    return platform;
  }

  async create(data: {
    name: string;
    slug?: string;
    logoUrl?: string;
    svgCode?: string;
    websiteUrl?: string;
    orderIndex?: number;
    isActive?: boolean;
  }) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return this.prisma.platformLogo.create({
      data: {
        name: data.name,
        slug,
        logoUrl: data.logoUrl || null,
        svgCode: data.svgCode || null,
        websiteUrl: data.websiteUrl || null,
        orderIndex: data.orderIndex ?? 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    slug: string;
    logoUrl: string;
    svgCode: string;
    websiteUrl: string;
    orderIndex: number;
    isActive: boolean;
  }>) {
    return this.prisma.platformLogo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.platformLogo.delete({ where: { id } });
  }

  async reorder(items: { id: string; orderIndex: number }[]) {
    return Promise.all(
      items.map(item =>
        this.prisma.platformLogo.update({
          where: { id: item.id },
          data: { orderIndex: item.orderIndex },
        }),
      ),
    );
  }
}
