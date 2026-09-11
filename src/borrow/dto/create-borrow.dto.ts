import {IsInt , IsDateString} from 'class-validator'

export class CreateBorrowDto {
    @IsInt()
    memberId : number;
    @IsInt()
    bookId : number;
}