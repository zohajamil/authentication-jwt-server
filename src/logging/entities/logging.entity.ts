import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Logging {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;

  @IsBoolean()
  isError: boolean;
}
