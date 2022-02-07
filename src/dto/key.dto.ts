import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class KeyDto {
  @IsString()
  @Length(1, 20)
  @ApiProperty({ description: 'key 값' })
  key: string;
}
