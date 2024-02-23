import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Logging {
  @Prop()
  description: string;

  @Prop()
  timestamp: Date;

  @Prop()
  isError: boolean;
}
export const LoggingSchema = SchemaFactory.createForClass(Logging);
