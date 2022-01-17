import { IsBoolean, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: '내용' })
  content: string;

  @IsBoolean()
  @ApiProperty({ description: '비밀 여부' })
  isSecret: boolean;
}
