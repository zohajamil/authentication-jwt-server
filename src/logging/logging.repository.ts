import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Logging } from './entities/logging.entity';
import { Model } from 'mongoose';

@Injectable()
export class LoggingRepository {
  constructor(@InjectModel('Logging') private loggingModel: Model<Logging>) {}

  async create(createLoggingDto: CreateLoggingDto) {
    try {
      Logger.log('Creating new log');
      await this.loggingModel.create({
        ...createLoggingDto,
        timestamp: new Date(),
      });
      return;
    } catch (error) {
      Logger.error(
        'logging.repository',
        'create',
        error.message,
        error.stack,
        '',
      );
      throw new InternalServerErrorException(error.message);
    }
  }
}
