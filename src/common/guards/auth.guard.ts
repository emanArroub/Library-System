import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { MembersService } from '../../members/members.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly membersService: MembersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const memberId = Number(request.headers['x-member-id']);
    if (!memberId) {
      throw new ForbiddenException('Missing member ID');
    }

    const member = await this.membersService.getMemberById(memberId);

    if (!member) {
      throw new ForbiddenException('Invalid member ID');
    }

    request.user = member;

    return true;
  }
}