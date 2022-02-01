import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@ApiTags('auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: '로그인',
    description: 'passport를 이용해 로그인 하기',
  })
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({})
  @Get('/kakao')
  async kakaoLogin() {
    return;
  }

  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({
    summary: '카카오 로그인',
    description: 'passport를 이용해 카카오 로그인 하기',
  })
  @Get('/kakao/oauth')
  async kakao(@Request() req) {
    return this.authService.kakaoLogin(req);
  }
}
