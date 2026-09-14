import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';

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
  @Roles('librarian')
  updateMember(@Param('id') id: number, @Body() dto: UpdateMemberDto) {
    return this.membersService.updateMember(id, dto);
  }

  @Delete(':id')
  @Roles('librarian')
  deleteMember(@Param('id') id: number) {
    return this.membersService.deleteMember(id);
  }
}
