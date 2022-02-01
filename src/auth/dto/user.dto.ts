import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
