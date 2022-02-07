import { Injectable } from '@nestjs/common';
import {
  TokenErrorResult,
  TokenSuccessResult,
} from './interfaces/token.interface';
import { KeyDto } from './dto/key.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMyInfo(
    token: string,
    keyDto: KeyDto,
  ): TokenSuccessResult | TokenErrorResult {
    console.log(keyDto.key);
    console.log(typeof keyDto.key);
    if (keyDto.key == '123') {
      if (token == 'abc') {
        return {
          name: 'rabong',
          id: '2022123456',
          major: '감귤포장학과',
          status: '재학 중',
        };
      } else {
        return {
          status: 'ER100',
          message: 'token 만료',
        };
      }
    } else {
      return {
        status: 'ER101',
        message: 'key 값이 다름',
      };
    }
  }
}
