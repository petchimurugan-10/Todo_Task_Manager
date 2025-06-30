import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Server } from 'socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Changed to remove the generic type
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  const server = app.get('SOCKET_IO_SERVER') as Server;
  server.listen(3001);

  await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();