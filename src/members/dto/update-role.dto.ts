import { IsIn, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsIn(['member', 'librarian'])
  @IsString()
  role: string;
}