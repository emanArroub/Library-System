import { Controller, Get } from '@nestjs/common';
import { CurrentRole } from './common/decorators/current-role.decorator.js';

@Controller()
export class AppController {
  @Get('check-role')
  checkRole(@CurrentRole() role: string) {
    return { role };
  }
}
