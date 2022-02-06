import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: '채팅방 이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '유저 이름' })
  user: string;
}
