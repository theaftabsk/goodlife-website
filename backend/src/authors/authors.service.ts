import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AuthorDto {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  role?: string;
  roleType?: string;
  bio?: string;
  avatar?: string;
  linkedin?: string;
  articlesCount?: number;
  status?: string;
  lastLogin?: string;
}

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.author.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) throw new NotFoundException(`Author with id "${id}" not found`);
    return author;
  }

  async create(data: AuthorDto) {
    const id = data.id || `auth-${Date.now()}`;
    return this.prisma.author.create({
      data: {
        id,
        name: data.name,
        email: data.email || null,
        password: data.password || 'author_pass_2026',
        role: data.role || 'Commerce Specialist',
        roleType: data.roleType || 'Author & Editor',
        bio: data.bio || '',
        avatar: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        linkedin: data.linkedin || '',
        articlesCount: data.articlesCount !== undefined ? Number(data.articlesCount) : 0,
        status: data.status || 'Active',
        lastLogin: data.lastLogin || 'Never',
      },
    });
  }

  async update(id: string, data: Partial<AuthorDto>) {
    await this.findOne(id);
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.password !== undefined) updateData.password = data.password;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.roleType !== undefined) updateData.roleType = data.roleType;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;
    if (data.articlesCount !== undefined) updateData.articlesCount = Number(data.articlesCount);
    if (data.status !== undefined) updateData.status = data.status;
    if (data.lastLogin !== undefined) updateData.lastLogin = data.lastLogin;

    return this.prisma.author.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.author.delete({ where: { id } });
    return { success: true, id };
  }

  async toggleStatus(id: string) {
    const existing = await this.findOne(id);
    const newStatus = existing.status === 'Active' ? 'Inactive' : 'Active';
    return this.prisma.author.update({
      where: { id },
      data: { status: newStatus },
    });
  }
}
