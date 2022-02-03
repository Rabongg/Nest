import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { LoginProvider } from './users/entities/user.entity';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(private httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.session?.token ? true : false;
    if (!auth) {
      throw new UnauthorizedException('로그인을 해야 합니다.');
    } else {
      const { token, provider } = request.session;
      const data = await this.verifyToken(token, provider);
      if (!data) {
        return false;
      }
      return true;
    }
  }

  async verifyToken(token: string, provider: LoginProvider) {
    try {
      if (provider == LoginProvider.KAKAO) {
        const headersRequest = {
          'Content-Type': 'application/x-www-form-urlencoded',
          // eslint-disable-next-line prettier/prettier
          'Authorization': `Bearer ${token}`,
        };
        const data = this.httpService.get(
          'https://kapi.kakao.com/v1/user/access_token_info',
          { headers: headersRequest },
        );
        return data;
      } else if (provider == LoginProvider.GOOGLE) {
        const data = this.httpService.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
        );
        return data;
      } else {
        const headersRequest = {
          // eslint-disable-next-line prettier/prettier
          'Authorization': `Bearer ${token}`,
        };
        const data = this.httpService.get(
          'https://openapi.naver.com/v1/nid/me',
          { headers: headersRequest },
        );
        return data;
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
