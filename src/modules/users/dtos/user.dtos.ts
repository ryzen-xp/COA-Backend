import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  balance: number;
}

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsNumber()
  balance?: number;
}
