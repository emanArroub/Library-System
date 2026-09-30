import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from '../../members/members.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(
  private readonly membersService: MembersService,
  private readonly jwtService: JwtService,
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException('Missing authorization token');
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedException('Invalid authorization format');
  }

  try {
    const payload = await this.jwtService.verifyAsync(token);

    const member = await this.membersService.getMemberById(payload.sub);

    request.user = member;

    return true;
  } catch {
    throw new UnauthorizedException('Invalid or expired token');
  }
}
}