import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ArticleInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  imageAlt?: string;
  category?: string;
  status?: string;
  author?: string;
  authorRole?: string;
  authorPhoto?: string;
  tags?: string[];
  date?: string;
  publishedAt?: string | Date;
  seoTitle?: string;
  seoDesc?: string;
  canonicalUrl?: string;
  ogImage?: string;
  readTime?: string;
}

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { category?: string; status?: string; search?: string }) {
    const where: any = {};
    if (query?.category && query.category !== 'All') {
      where.category = query.category;
    }
    if (query?.status && query.status !== 'All') {
      where.status = query.status;
    }
    if (query?.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { excerpt: { contains: query.search, mode: 'insensitive' } },
        { author: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublished(category?: string) {
    const where: any = { status: 'Published' };
    if (category && category !== 'All') {
      where.category = category;
    }
    return this.prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findOne(slugOrId: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async create(data: ArticleInput) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const publishedAt = data.status === 'Published' ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null;

    return this.prisma.article.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        imageAlt: data.imageAlt || null,
        category: data.category || 'General',
        status: data.status || 'Draft',
        author: data.author || 'Good Life Team',
        authorRole: data.authorRole || null,
        authorPhoto: data.authorPhoto || null,
        tags: data.tags || [],
        date,
        publishedAt,
        seoTitle: data.seoTitle || null,
        seoDesc: data.seoDesc || null,
        canonicalUrl: data.canonicalUrl || `/insights/${slug}`,
        ogImage: data.ogImage || data.featuredImage || null,
        readTime: data.readTime || '5 min read',
      },
    });
  }

  async update(id: string, data: Partial<ArticleInput>) {
    const existing = await this.prisma.article.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Article not found');

    let publishedAt = existing.publishedAt;
    if (data.status === 'Published' && !existing.publishedAt) {
      publishedAt = new Date();
    } else if (data.publishedAt) {
      publishedAt = new Date(data.publishedAt);
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }

  async toggleStatus(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');

    const newStatus = article.status === 'Published' ? 'Draft' : 'Published';
    const publishedAt = newStatus === 'Published' ? (article.publishedAt || new Date()) : null;

    return this.prisma.article.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
      },
    });
  }

  async duplicate(id: string) {
    const existing = await this.prisma.article.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Article not found');

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newSlug = `${existing.slug}-copy-${randomSuffix}`;

    return this.prisma.article.create({
      data: {
        title: `${existing.title} (Draft Copy)`,
        slug: newSlug,
        excerpt: existing.excerpt,
        content: existing.content,
        featuredImage: existing.featuredImage,
        imageAlt: existing.imageAlt,
        category: existing.category,
        status: 'Draft',
        author: existing.author,
        authorRole: existing.authorRole,
        authorPhoto: existing.authorPhoto,
        tags: existing.tags,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        publishedAt: null,
        seoTitle: existing.seoTitle,
        seoDesc: existing.seoDesc,
        canonicalUrl: `/insights/${newSlug}`,
        ogImage: existing.ogImage,
        readTime: existing.readTime,
      },
    });
  }
}
