import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { LoggingRepository } from './logging.repository';
import { LoggingSchema } from './entities/logging.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Logging', schema: LoggingSchema }]),
    HttpModule,
  ],
  controllers: [LoggingController],
  providers: [LoggingService, LoggingRepository],
  exports: [LoggingService],
})
export class LoggingModule {}
