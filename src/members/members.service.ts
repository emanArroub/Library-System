import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async getMemberById(id: number) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async getAllMembers() {
    return await this.prisma.member.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async addMember(dto: CreateMemberDto) {
    return await this.prisma.member.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: 'member',
      },
    });
  }

  async updateMember(id: number, dto: UpdateMemberDto) {
    try {
      return await this.prisma.member.update({
        where: { id },
        data: dto,
      });
    } catch {
      throw new NotFoundException('Member not found');
    }
  }

  async deleteMember(id: number) {
    try {
      return await this.prisma.member.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Member not found');
    }
  }

  async updateRole(id: number, role: string) {
    try {
      return await this.prisma.member.update({
        where: { id },
        data: { role },
      });
    } catch {
      throw new NotFoundException('Member not found');
    }
  }
}
