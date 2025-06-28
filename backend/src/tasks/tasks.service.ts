import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskShare } from './entities/task-share.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateTaskDto, UpdateTaskDto, CreateTaskSchema } from './dtos';
import { z } from 'zod';
import { Server } from 'socket.io';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(TaskShare)
    private taskShareRepository: Repository<TaskShare>,
    private usersService: UsersService,
    public socket: Server,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const validatedData = CreateTaskSchema.parse(createTaskDto);
    const task = this.tasksRepository.create({
      ...validatedData,
      user,
    });
    const savedTask = await this.tasksRepository.save(task);
    this.socket.emit('taskUpdate', { taskId: savedTask.id, userId: user.id });
    return savedTask;
  }

  async findAll(user: User): Promise<Task[]> {
    const ownedTasks = await this.tasksRepository.find({ where: { user: { id: user.id } } });
    const sharedTasks = await this.taskShareRepository.find({
      where: { sharedWith: { id: user.id } },
      relations: ['task'],
    });
    return [...ownedTasks, ...sharedTasks.map(share => share.task)];
  }

  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.tasksRepository.save(task);
    this.socket.emit('taskUpdate', { taskId: updatedTask.id, userId: user.id });
    return updatedTask;
  }

  async delete(id: number, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasksRepository.remove(task);
    this.socket.emit('taskUpdate', { taskId: id, userId: user.id });
  }

  async share(id: number, email: string, user: User): Promise<void> {
    console.log(`Sharing task ${id} for user ${user.id} with email ${email}`);
    const task = await this.findOne(id, user);
    const sharedUser = await this.usersService.findByEmail(email);
    console.log(`Shared user found: ${!!sharedUser}, email: ${email}`);
    if (!sharedUser) throw new NotFoundException('User not found');
    const taskShare = this.taskShareRepository.create({
      task,
      sharedWith: sharedUser,
      owner: user,
    });
    await this.taskShareRepository.save(taskShare);
    console.log(`TaskShare saved: taskId=${id}, sharedWithId=${sharedUser.id}`);
    this.socket.emit('taskShared', {
      taskId: id,
      sharedWithId: sharedUser.id,
      ownerId: user.id,
      message: `Task "${task.title}" shared with ${sharedUser.email}`,
    });
    console.log(`Task ${id} shared with ${email}`);
  }
}