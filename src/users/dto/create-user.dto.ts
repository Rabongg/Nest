import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginProvider } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsString()
  @Length(1, 20)
  @ApiProperty({ description: '별명' })
  nickname: string;

  @IsEmail()
  @Length(7, 50)
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsEnum(LoginProvider)
  @ApiProperty({ description: '로그인 플랫폼' })
  provider: LoginProvider;
}
