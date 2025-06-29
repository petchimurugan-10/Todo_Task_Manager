import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3001', credentials: true });

  const io = new Server(app.getHttpServer(), {
    cors: { origin: 'http://localhost:3001', credentials: true },
  });

  // Make Socket.IO server available to TasksService
  app.get(TasksService).socket = io;

  await app.listen(3000);
}
bootstrap();