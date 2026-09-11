import { PipeTransform, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class ValidateMemberPipe implements PipeTransform {
  transform(value: any) {
    if (!value.memberId) {
      throw new HttpException('memberId is required', 400);
    }

    if (value.memberId <= 0) {
      throw new HttpException('Invalid memberId', 400);
    }

    return value;
  }
}