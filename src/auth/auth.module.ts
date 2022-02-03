import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '@src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { NaverStrategy } from './naver.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    KakaoStrategy,
    GoogleStrategy,
    NaverStrategy,
  ],
})
export class AuthModule {}
