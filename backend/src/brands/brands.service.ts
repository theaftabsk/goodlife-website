import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brandLogo.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.brandLogo.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findOne(id: string) {
    const brand = await this.prisma.brandLogo.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async create(data: {
    name: string;
    slug?: string;
    category?: string;
    logoUrl?: string;
    svgCode?: string;
    websiteUrl?: string;
    orderIndex?: number;
    isActive?: boolean;
  }) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return this.prisma.brandLogo.create({
      data: {
        name: data.name,
        slug,
        category: data.category || null,
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
    category: string;
    logoUrl: string;
    svgCode: string;
    websiteUrl: string;
    orderIndex: number;
    isActive: boolean;
  }>) {
    return this.prisma.brandLogo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.brandLogo.delete({ where: { id } });
  }

  async reorder(items: { id: string; orderIndex: number }[]) {
    return Promise.all(
      items.map(item =>
        this.prisma.brandLogo.update({
          where: { id: item.id },
          data: { orderIndex: item.orderIndex },
        }),
      ),
    );
  }
}
