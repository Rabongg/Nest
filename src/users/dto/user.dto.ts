import { IsString, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginProvider } from '../entities/user.entity';

export class UserDto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsEnum(LoginProvider)
  @ApiProperty({ description: '로그인 제공자' })
  provider: LoginProvider;
}
