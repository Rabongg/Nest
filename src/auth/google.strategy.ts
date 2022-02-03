import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { LoginProvider } from '@src/users/entities/user.entity';
import { UsersService } from '@src/users/users.service';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy, 'google')
  implements OnModuleInit
{
  private usersService: UsersService;

  constructor(configService: ConfigService, private moduleRef: ModuleRef) {
    super({
      clientID: configService.get<string>('GOOGLE_KEY'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
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
      console.log(profile);
      const user = await this.usersService.findOne({
        username: profile.id,
        provider: LoginProvider.GOOGLE,
      });
      if (user) {
        done(null, { ...user, accessToken });
      } else {
        const user = await this.usersService.create({
          username: profile.id,
          email: profile.emails[0].value,
          nickname: profile.displayName,
          provider: LoginProvider.GOOGLE,
        });
        done(null, { ...user, accessToken });
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
