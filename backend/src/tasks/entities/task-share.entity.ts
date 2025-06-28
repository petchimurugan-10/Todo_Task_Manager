import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TaskShare {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, task => task.id)
  task: Task;

  @ManyToOne(() => User, user => user.id)
  sharedWith: User;

  @ManyToOne(() => User, user => user.id)
  owner: User;
}