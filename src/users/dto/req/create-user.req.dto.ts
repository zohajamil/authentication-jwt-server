import { IsNotEmpty, IsString } from 'class-validator';
import { AuthenticateUserRequestDto } from './authenticate-user.req.dto';

export class CreateUserRequestDto extends AuthenticateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}
