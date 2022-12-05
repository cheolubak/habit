import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    privateKey: configService.get('FIREBASE_PRIVATE_KEY'),
    projectId: configService.get('FIREBASE_PROJECT_ID'),
    clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
  };
  initializeApp({
    credential: cert(adminConfig),
  });
  await app.listen(4000);
}

bootstrap();
