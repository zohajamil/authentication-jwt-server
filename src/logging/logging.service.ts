import { Injectable } from '@nestjs/common';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { LoggingRepository } from './logging.repository';

@Injectable()
export class LoggingService {
  constructor(private readonly loggingRepository: LoggingRepository) {}

  async create(createLoggingDto: CreateLoggingDto): Promise<void> {
    await this.loggingRepository.create(createLoggingDto);
  }
}
