import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['x-role'] || 'guest';
  },
);