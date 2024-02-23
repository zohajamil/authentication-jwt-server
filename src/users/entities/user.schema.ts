import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  surname: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
