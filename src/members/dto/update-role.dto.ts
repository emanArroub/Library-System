import { IsIn } from 'class-validator';

export class UpdateRoleDto {
  @IsIn(['member', 'librarian'])
  role: 'member' | 'librarian';
}