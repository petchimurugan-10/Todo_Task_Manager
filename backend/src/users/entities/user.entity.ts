import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { TaskShare } from '../../tasks/entities/task-share.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  googleId: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => TaskShare, (taskShare) => taskShare.sharedWith)
  sharedTasks: TaskShare[];

  @OneToMany(() => TaskShare, (taskShare) => taskShare.owner)
  ownedShares: TaskShare[];
}