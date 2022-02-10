import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindRoomQueryDto {
  @IsNumber()
  @ApiProperty({ description: 'skip할 숫자' })
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @ApiProperty({ description: '볼 수 있는 숫자' })
  @Min(1)
  @Type(() => Number)
  limit: number;
}
