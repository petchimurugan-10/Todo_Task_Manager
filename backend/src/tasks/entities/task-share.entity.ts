import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TaskShare {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.taskShares)
  task: Task;

  @ManyToOne(() => User, (user) => user.sharedTasks)
  sharedWith: User;

  @ManyToOne(() => User, (user) => user.ownedShares)
  owner: User;
}