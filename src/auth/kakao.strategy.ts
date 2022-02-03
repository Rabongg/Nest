import { Strategy, VerifyCallback } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@src/users/users.service';
import { LoginProvider } from '@src/users/entities/user.entity';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class KakaoStrategy
  extends PassportStrategy(Strategy, 'kakao')
  implements OnModuleInit
{
  private usersService: UsersService;

  constructor(configService: ConfigService, private moduleRef: ModuleRef) {
    super({
      clientID: configService.get<string>('KAKAO_KEY'),
      callbackURL: configService.get<string>('KAKAO_REDIRECT_URL'),
    });
  }

  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const user = await this.usersService.findOne({
        username: profile.id,
        provider: LoginProvider.KAKAO,
      });
      if (user) {
        done(null, { ...user, accessToken });
      } else {
        const user = await this.usersService.create({
          username: profile.id,
          email: profile._json.kakao_account.email,
          nickname: profile._json.properties.nickname,
          provider: LoginProvider.KAKAO,
        });
        done(null, { ...user, accessToken });
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('로그인 실패');
    }
  }

  serializeUser(user: any, done: any) {
    done(null, user);
  }

  deserializeUser(user: any, done: any) {
    done(null, user);
  }
}
