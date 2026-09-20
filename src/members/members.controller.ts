import {Controller,Get,Post,Body,Param,Delete,UseGuards,Patch} from '@nestjs/common';
import { MembersService } from './members.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { AuthGuard} from '../common/guards/auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@UseGuards(AuthGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Get()
  getAllMembers() {
    return this.membersService.getAllMembers();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Post()
  addMember(@Body() dto: CreateMemberDto) {
    return this.membersService.addMember(dto);
  }

@UseGuards(AuthGuard, RolesGuard)
@Roles('librarian')
@Patch(':id')
updateMember(@Param('id') id: number, @Body() dto: UpdateMemberDto) {
  return this.membersService.updateMember(id, dto);
}

@UseGuards(AuthGuard, RolesGuard)
@Roles('librarian')
@Delete(':id')
deleteMember(@Param('id') id: number) {
  return this.membersService.deleteMember(id);
}

@UseGuards(AuthGuard, RolesGuard)
@Roles('librarian')
@Patch(':id/role')
updateRole(@Param('id') id: number, @Body('role') role: 'member' | 'librarian') {
  return this.membersService.updateRole(id, role);
}

}