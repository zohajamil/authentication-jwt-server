import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticatedUserResponseDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}
