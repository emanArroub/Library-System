import {
  Controller,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('member')
  @Post()
  borrowBook(@CurrentUser() user: Member, @Body() dto: CreateBorrowDto) {
    return this.borrowService.borrowBook(user.id, dto.bookId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('member')
  @Patch(':id/return')
  returnBook(@CurrentUser() user: Member, @Param('id') id: number) {
    return this.borrowService.returnBook(user.id, id);
  }
}