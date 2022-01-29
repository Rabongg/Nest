import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '유저 회원가입',
    description: '유저가 회원가입한다',
  })
  @ApiCreatedResponse({ description: '유저 생성 성공' })
  @ApiConflictResponse({ description: '문제가 발생했습니다.' })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인', description: '로그인 하기' })
  @ApiUnauthorizedResponse({ description: '아이디 또는 비밀번호가 틀립니다.' })
  @Post()
  login(@Body() userDto: UserDto, @Session() session: Record<string, any>) {
    return this.usersService.login(userDto, session);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
