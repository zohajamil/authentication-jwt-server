import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateUserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
