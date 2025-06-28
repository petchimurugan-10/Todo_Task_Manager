import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ default: 'Medium' })
  priority: string;

  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}