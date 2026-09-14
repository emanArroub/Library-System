import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private nextId = 1;

  getAllMembers() {
    return this.members;
  }

  addMember(dto: CreateMemberDto) {
    const member: Member = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    };

    this.members.push(member);
    return member;
  }

  updateMember(id: number, dto: UpdateMemberDto) {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException('Member not found');

    this.members[index] = { ...this.members[index], ...dto };
    return this.members[index];
  }

  deleteMember(id: number) {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException('Member not found');

    const deleted = this.members[index];
    this.members.splice(index, 1);
    return deleted;
  }
}
