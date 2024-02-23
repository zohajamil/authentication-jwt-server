import { Controller, Post, Body } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CreateLoggingDto } from './dto/create-logging.dto';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Post()
  create(@Body() createLoggingDto: CreateLoggingDto) {
    return this.loggingService.create(createLoggingDto);
  }
}
