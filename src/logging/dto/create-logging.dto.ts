import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoggingDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isError: boolean;
}
