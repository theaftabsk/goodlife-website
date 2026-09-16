import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productCategory.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.productCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(data: {
    name: string;
    slug?: string;
    description?: string;
    subcategories?: string[];
    icon?: string;
    orderIndex?: number;
    isActive?: boolean;
  }) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return this.prisma.productCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        subcategories: data.subcategories || [],
        icon: data.icon || null,
        orderIndex: data.orderIndex ?? 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    slug: string;
    description: string;
    subcategories: string[];
    icon: string;
    orderIndex: number;
    isActive: boolean;
  }>) {
    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.productCategory.delete({ where: { id } });
  }

  async reorder(items: { id: string; orderIndex: number }[]) {
    return Promise.all(
      items.map(item =>
        this.prisma.productCategory.update({
          where: { id: item.id },
          data: { orderIndex: item.orderIndex },
        }),
      ),
    );
  }
}
