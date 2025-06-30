import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { TaskShare, TaskShareSchema } from './entities/task-share.entity';
import { Server } from 'socket.io';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskShare.name, schema: TaskShareSchema },
    ]),
  ],
  providers: [
    TasksService,
    {
      provide: 'SOCKET_IO_SERVER',
      useValue: new Server(),
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}