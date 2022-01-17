import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsString()
  @Length(2, 4)
  @ApiProperty({ description: '이름' })
  name: string;

  @IsString()
  @Length(1, 20)
  @ApiProperty({ description: '별명' })
  nickname: string;

  @IsEmail()
  @Length(7, 50)
  @ApiProperty({ description: '이메일' })
  email: string;
}
