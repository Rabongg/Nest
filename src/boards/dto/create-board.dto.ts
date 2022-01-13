import { IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(1, 20)
  title: string;

  @IsString()
  content: string;

  @IsString()
  categoryId: number;
}
