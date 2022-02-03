/* eslint-disable @typescript-eslint/no-empty-function */
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
  @ApiOperation({
    summary: '카카오 로그인',
    description: 'passport를 이용해 카카오 로그인 하기',
  })
  @Get('/kakao')
  async kakao() {}

  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({
    summary: '카카오 로그인 redirect url',
    description: '카카오 로그인 redirect url',
  })
  @Get('/kakao/oauth')
  async kakaoLogin(@Request() req) {
    return this.authService.kakaoLogin(req);
  }

  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: '구글 로그인',
    description: 'passport를 이용해 구글 로그인 하기',
  })
  @Get('/google')
  async google() {}

  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: '구글 로그인 redirect url',
    description: '구글 로그인 redirect url',
  })
  @Get('/google/oauth')
  async googleLogin(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @UseGuards(AuthGuard('naver'))
  @ApiOperation({
    summary: '네이버 로그인',
    description: 'passport를 이용해 네이버 로그인 하기',
  })
  @Get('/naver')
  async naver() {}

  @UseGuards(AuthGuard('naver'))
  @ApiOperation({
    summary: '네이버 로그인 redirect url',
    description: '네이버 로그인 redirect url',
  })
  @Get('/naver/oauth')
  async naverLogin(@Request() req) {
    return this.authService.naverLogin(req);
  }
}
