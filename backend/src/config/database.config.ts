import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskShare } from '../tasks/entities/task-share.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://user1:password@localhost:5432/todo',
  entities: [User, Task, TaskShare],
  synchronize: true, // Set to false in production
};