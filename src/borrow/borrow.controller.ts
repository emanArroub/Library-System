import {
  Controller,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  Get
} from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { CreateBorrowDto } from './dto/create-borrow.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-role.decorator.js';
import type { Member } from '../common/interfaces/member.interface.js';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

   @Get()
    async getAllBorrows() {
      return await this.borrowService.getAllBorrows();
    }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('member')
  @Post()
  async borrowBook(@Body() dto: CreateBorrowDto, @Req() req) {
    return await this.borrowService.borrowBook(req.user.id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('member')
  @Patch(':id/return')
  async returnBook(@CurrentUser() user: Member, @Param('id') id: number) {
    return await this.borrowService.returnBook(user.id, id);
  }
}