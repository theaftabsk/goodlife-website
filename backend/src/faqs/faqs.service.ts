import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface FaqDto {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  status?: string;
  isPublished?: boolean;
  orderIndex?: number;
  isFeatured?: boolean;
}

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    const items = await this.prisma.fAQ.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
    });

    return items;
  }

  async findOne(id: string) {
    const faq = await this.prisma.fAQ.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException(`FAQ with id "${id}" not found`);
    return faq;
  }

  async create(data: FaqDto) {
    const id = data.id || `faq-${Date.now()}`;
    const status = data.status || (data.isPublished === false ? 'Draft' : 'Published');
    const isPublished = status === 'Published';

    const count = await this.prisma.fAQ.count();
    const orderIndex = data.orderIndex !== undefined ? Number(data.orderIndex) : count + 1;

    return this.prisma.fAQ.create({
      data: {
        id,
        question: data.question,
        answer: data.answer || '',
        category: data.category || 'General',
        status,
        isPublished,
        orderIndex,
        isFeatured: data.isFeatured ?? false,
      },
    });
  }

  async update(id: string, data: Partial<FaqDto>) {
    const existing = await this.findOne(id);
    const updateData: any = {};

    if (data.question !== undefined) updateData.question = data.question;
    if (data.answer !== undefined) updateData.answer = data.answer;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.orderIndex !== undefined) updateData.orderIndex = Number(data.orderIndex);
    if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;

    if (data.status !== undefined) {
      updateData.status = data.status;
      updateData.isPublished = data.status === 'Published';
    } else if (data.isPublished !== undefined) {
      updateData.isPublished = data.isPublished;
      updateData.status = data.isPublished ? 'Published' : 'Draft';
    }

    return this.prisma.fAQ.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.fAQ.delete({ where: { id } });
    return { success: true, id };
  }

  async toggleStatus(id: string) {
    const existing = await this.findOne(id);
    const newStatus = existing.status === 'Published' ? 'Draft' : 'Published';
    const isPublished = newStatus === 'Published';

    return this.prisma.fAQ.update({
      where: { id },
      data: {
        status: newStatus,
        isPublished,
      },
    });
  }

  async toggleFeatured(id: string) {
    const existing = await this.findOne(id);
    return this.prisma.fAQ.update({
      where: { id },
      data: {
        isFeatured: !existing.isFeatured,
      },
    });
  }

  async duplicate(id: string) {
    const src = await this.findOne(id);
    const newId = `faq-${Date.now()}`;
    const count = await this.prisma.fAQ.count();

    return this.prisma.fAQ.create({
      data: {
        id: newId,
        question: `${src.question} (Copy)`,
        answer: src.answer,
        category: src.category,
        status: 'Draft',
        isPublished: false,
        orderIndex: count + 1,
        isFeatured: false,
      },
    });
  }
}
