import { Strategy, VerifyCallback } from 'passport-naver';
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
export class NaverStrategy
  extends PassportStrategy(Strategy, 'naver')
  implements OnModuleInit
{
  private usersService: UsersService;

  constructor(configService: ConfigService, private moduleRef: ModuleRef) {
    super({
      clientID: configService.get<string>('NAVER_CLIENT_ID'),
      clientSecret: configService.get<string>('NAVER_SECRET'),
      callbackURL: configService.get<string>('NAVER_REDIRECT_URL'),
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
        provider: LoginProvider.NAVER,
      });
      if (user) {
        done(null, { ...user, accessToken });
      } else {
        const user = await this.usersService.create({
          username: profile.id,
          email: profile.emails[0].value,
          nickname: profile.displayName,
          provider: LoginProvider.NAVER,
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
