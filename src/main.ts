import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      name: 'Fanta',
      secret: 'An0+n4lh2Ag1tEAs9ad1',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        sameSite: 'strict',
      },
    }),
  );

  app.enableCors();
  // app.enableCors({
  //   origin: 'http://localhost:8100',
  //   credentials: true,
  // });
  await app.listen(3000);
}
bootstrap();
