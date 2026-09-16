import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './common/decorators/current-role.decorator.js';

@Controller()
export class AppController {
  @Get('check-role')
  checkRole(@CurrentUser() role: string) {
    return { role };
  }
}
