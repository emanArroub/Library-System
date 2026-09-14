import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseFilters,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { CreateBorrowDto } from './dto/create-borrow.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { ValidateMemberPipe } from '../common/pipes/validate-member.pipe.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  getAllBorrows() {
    return this.borrowService.getAllBorrows();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(ValidateMemberPipe)
  @Roles('member')
  @Post()
  borrowBook(@Body() dto: CreateBorrowDto) {
    return this.borrowService.borrowBook(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('member')
  @Patch(':id/return')
  returnBook(@Param('id') id: number) {
    return this.borrowService.returnBook(id);
  }
}
