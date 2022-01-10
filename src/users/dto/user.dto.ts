import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
