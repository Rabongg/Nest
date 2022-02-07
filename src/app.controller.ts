import { Controller, Get, Headers, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KeyDto } from './dto/key.dto';

@Controller('api')
@ApiTags('기본 test api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'pToken 정보 받기',
    description: 'pToken 정보 받아서 처리하기',
  })
  @Post('/v1/auth')
  getMyInfo(@Headers('pToken') pToken: string, @Body() keyDto: KeyDto) {
    return this.appService.getMyInfo(pToken, keyDto);
  }
}
