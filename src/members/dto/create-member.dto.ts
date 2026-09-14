import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsIn(['member', 'librarian'])
  role: 'member' | 'librarian';
}
