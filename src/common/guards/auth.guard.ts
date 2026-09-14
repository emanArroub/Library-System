import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { MembersService } from '../../members/members.service.js';
import { Member } from '../../members/member.entity.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly membersService: MembersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // جلب الـ memberId من الـ request (مثلاً من الـ body أو من الـ token لاحقًا)
    const memberId = Number(request.headers['x-member-id']);
    const member = this.membersService
      .getAllMembers()
      .find((m) => m.id === memberId);

    if (!member) {
      throw new ForbiddenException('Invalid member ID');
    }

    request.user = member; // أهم سطر
    return true;
  }
}
