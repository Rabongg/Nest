import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsString()
  @Length(2, 4)
  name: string;

  @IsString()
  @Length(1, 20)
  nickname: string;

  @IsEmail()
  @Length(7, 50)
  email: string;
}
