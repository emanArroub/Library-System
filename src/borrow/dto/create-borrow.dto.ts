import { IsInt } from 'class-validator';

export class CreateBorrowDto {
  @IsInt()
  bookId: number;

}
