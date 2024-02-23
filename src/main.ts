import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options = {
    origin: '*', //process.env.DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  app.use(bodyParser.json());

  app.listen(PORT, function () {
    console.log('Server listening on port %d', PORT);
  });
}

bootstrap();
