import { Injectable } from '@nestjs/common';
import {
  TokenErrorResult,
  TokenSuccessResult,
} from './interfaces/token.interface';
import { KeyDto } from './dto/key.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getMyInfo(
    token: string,
    keyDto: KeyDto,
  ): TokenSuccessResult | TokenErrorResult {
    console.log(keyDto.key);
    console.log(typeof keyDto.key);
    if (keyDto.key == this.configService.get('SSO_KEY')) {
      if (token == 'abc') {
        return {
          name: 'rabong',
          id: '2022123456',
          major: '소프트웨어학과',
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
