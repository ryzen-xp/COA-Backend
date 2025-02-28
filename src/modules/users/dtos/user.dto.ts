import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {

  username: string;
  email: string;
  password: string;

    @IsString()
    @MinLength(3)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

}


export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  balance?: number;
}
