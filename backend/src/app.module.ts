import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { Task } from './tasks/entities/task.entity';
import { TaskShare } from './tasks/entities/task-share.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: {
        DATABASE_URL: { required: true, type: 'string' },
        JWT_SECRET: { required: true, type: 'string' },
        GOOGLE_CLIENT_ID: { required: true, type: 'string' },
        GOOGLE_CLIENT_SECRET: { required: true, type: 'string' },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Creates tables automatically
      entities: [Task, TaskShare, User], // Explicitly load entities
    }),
    AuthModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}