import { Controller, Get, Post, Body, Param, UseGuards, UseFilters, UsePipes } from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { CreateBorrowDto } from './dto/create-borrow.dto.js';
import { ReturnBorrowDto } from './dto/return-borrow.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter.js';
import { ValidateMemberPipe } from '../common/pipes/validate-member.pipe.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('borrow')
@UseGuards(AuthGuard, RolesGuard)
@UseFilters(HttpExceptionFilter)


export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  getAllBorrows() {
    return this.borrowService.getAllBorrows();
  }

  @Post()
  @Roles('member')
  @UsePipes(ValidateMemberPipe)
  borrowBook(@Body() dto: CreateBorrowDto) {
    return this.borrowService.borrowBook(dto);
  }

  @Post(':id/return')
  @Roles('member')
  returnBook(@Param('id') id: number, @Body() dto: ReturnBorrowDto) {
    return this.borrowService.returnBook(id, dto);
  }
}