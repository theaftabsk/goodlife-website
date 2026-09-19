import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface FaqDto {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  isPublished?: boolean;
  orderIndex?: number;
}

const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "How does Good Life Sutra differ from standard 3PL logistics providers?",
    answer: "Standard 3PLs only provide warehouse space and transport. Good Life provides unified commercial accountability: multi-state warehousing, marketplace listing defense, buy-box algorithms, and daily escrow reconciliation to prevent settlement leakages.",
    category: "Operations",
    orderIndex: 1,
    isPublished: true
  },
  {
    id: "faq-2",
    question: "How fast can an appliance brand be onboarded across 12 Indian states?",
    answer: "Our standardized APOB registration and bonded hub inbound workflows enable national distribution within 10 to 14 business days.",
    category: "Onboarding",
    orderIndex: 2,
    isPublished: true
  },
  {
    id: "faq-3",
    question: "How are customer returns and damaged appliances handled?",
    answer: "Every regional hub features an on-site technical inspection cell. Returned units are triaged within 24 hours: restockable units are refurbished, and transit damages trigger automated claim filing against carriers.",
    category: "Fulfillment",
    orderIndex: 3,
    isPublished: true
  },
  {
    id: "faq-4",
    question: "Does Good Life integrate directly with SAP or custom enterprise ERPs?",
    answer: "Yes, our proprietary API gateway syncs bidirectionally with SAP, Oracle, Zoho, and custom warehouse management systems with 99.9% uptime SLAs.",
    category: "Operations",
    orderIndex: 4,
    isPublished: true
  }
];

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const items = await this.prisma.fAQ.findMany({
        orderBy: { orderIndex: 'asc' },
        include: { category: true }
      });
      if (items && items.length > 0) {
        return items.map(f => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category?.name || "Operations",
          isPublished: f.isPublished,
          orderIndex: f.orderIndex,
          createdAt: f.createdAt
        }));
      }
    } catch (err) {
      // Prisma FAQ table might not be migrated yet; fallback to Setting store
    }

    try {
      const record = await this.prisma.setting.findUnique({
        where: { key: 'faqs' }
      });
      if (record && record.value) {
        return JSON.parse(record.value);
      }
    } catch (_) {}

    return DEFAULT_FAQS;
  }

  async findOne(id: string) {
    try {
      const faq = await this.prisma.fAQ.findUnique({ where: { id } });
      if (faq) return faq;
    } catch (_) {}

    const all = await this.findAll();
    const found = all.find((f: any) => f.id === id);
    if (!found) throw new NotFoundException('FAQ not found');
    return found;
  }

  async create(data: FaqDto) {
    const id = data.id || `faq-${Date.now()}`;
    const newFaq = {
      id,
      question: data.question,
      answer: data.answer || '',
      category: data.category || 'Operations',
      isPublished: data.isPublished ?? true,
      orderIndex: data.orderIndex ?? 0
    };

    try {
      await this.prisma.fAQ.create({
        data: {
          id,
          question: newFaq.question,
          answer: newFaq.answer,
          isPublished: newFaq.isPublished,
          orderIndex: newFaq.orderIndex
        }
      });
    } catch (_) {
      // Backup to setting store
    }

    try {
      const all = await this.findAll();
      const updated = [...all.filter((f: any) => f.id !== id), newFaq];
      await this.prisma.setting.upsert({
        where: { key: 'faqs' },
        update: { value: JSON.stringify(updated) },
        create: { key: 'faqs', value: JSON.stringify(updated) }
      });
    } catch (_) {}

    return newFaq;
  }

  async update(id: string, data: Partial<FaqDto>) {
    try {
      await this.prisma.fAQ.update({
        where: { id },
        data: {
          ...(data.question && { question: data.question }),
          ...(data.answer && { answer: data.answer }),
          ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
          ...(data.orderIndex !== undefined && { orderIndex: data.orderIndex })
        }
      });
    } catch (_) {}

    try {
      const all = await this.findAll();
      const updated = all.map((f: any) => f.id === id ? { ...f, ...data } : f);
      await this.prisma.setting.upsert({
        where: { key: 'faqs' },
        update: { value: JSON.stringify(updated) },
        create: { key: 'faqs', value: JSON.stringify(updated) }
      });
      return updated.find((f: any) => f.id === id);
    } catch (_) {}

    return { id, ...data };
  }

  async delete(id: string) {
    try {
      await this.prisma.fAQ.delete({ where: { id } });
    } catch (_) {}

    try {
      const all = await this.findAll();
      const updated = all.filter((f: any) => f.id !== id);
      await this.prisma.setting.upsert({
        where: { key: 'faqs' },
        update: { value: JSON.stringify(updated) },
        create: { key: 'faqs', value: JSON.stringify(updated) }
      });
    } catch (_) {}

    return { success: true, id };
  }
}
