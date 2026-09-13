import { IsString, IsInt ,Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  totalCopies: number;

  @IsInt()
  @Min(0)
  availableCopies : number
}