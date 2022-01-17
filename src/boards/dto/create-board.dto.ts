import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsString()
  @Length(1, 20)
  @ApiProperty({ description: '제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '카테고리' })
  categoryId: number;
}
