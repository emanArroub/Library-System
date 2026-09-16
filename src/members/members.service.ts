import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  private members: Member[] = [
      {
        id : 1,
        name: "Admin",
        email: "admin@example.com",
        role : 'librarian'
},
    
  ];
  private nextId = 2;

  getMemberById(id: number) {
    return this.members.find(m => m.id === id);
}

  getAllMembers() {
    return this.members;
  }

  addMember(dto: CreateMemberDto) {
  const member: Member = {
    id: this.nextId++,
    name: dto.name,
    email: dto.email,
    role: 'member', 
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

  updateRole(id: number, role: 'member' | 'librarian') {
  const member = this.members.find(m => m.id === id);
  if (!member) throw new NotFoundException('Member not found');

  member.role = role;
  return member;
}

}
