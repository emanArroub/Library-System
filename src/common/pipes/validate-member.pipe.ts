import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ValidateMemberPipe implements PipeTransform {
  transform(value: any) {
    if (!value.memberId) {
      throw new BadRequestException('memberId is required');
    }

    if (!value.bookId) {
      throw new BadRequestException('bookId is required');
    }

    return value;
  }
}
