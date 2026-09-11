import {IsDateString} from 'class-validator'


export class ReturnBorrowDto {
    @IsDateString()
    returnDate : Date;
}