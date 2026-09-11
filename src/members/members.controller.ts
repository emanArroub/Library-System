import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MembersService } from './members.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

  @Get()
  getAllMembers() {
    return this.membersService.getAllMembers();
  }

  @Post()
  addMember(@Body() dto: CreateMemberDto) {
    return this.membersService.addMember(dto);
  }

  @Put(':id')
  updateMember(@Param('id') id: number, @Body() dto: UpdateMemberDto) {
    return this.membersService.updateMember(id, dto);
  }

  @Delete(':id')
  deleteMember(@Param('id') id: number) {
    return this.membersService.deleteMember(id);
  }
}
