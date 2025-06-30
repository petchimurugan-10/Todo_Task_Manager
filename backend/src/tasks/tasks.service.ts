import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { TaskShare, TaskShareDocument } from './entities/task-share.entity';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common/';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(TaskShare.name) private taskShareModel: Model<TaskShareDocument>,
    @Inject('SOCKET_IO_SERVER') public socket: Server,
  ) {}

  async create(createTaskDto: any, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, userId });
    const savedTask = await task.save();
    this.socket.emit('taskUpdate', { taskId: savedTask._id, userId });
    return savedTask;
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).populate('userId', 'name email').exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).populate('userId', 'name email').exec();
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: any, userId: string): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate({ _id: id, userId }, updateTaskDto, { new: true }).exec();
    if (!task) {
      throw new Error('Task not found or unauthorized'); // Handle the case where task is null
    }
    this.socket.emit('taskUpdate', { taskId: id, userId });
    return task;
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.taskModel.findOneAndDelete({ _id: id, userId }).exec();
    await this.taskShareModel.deleteMany({ taskId: id }).exec();
  }

  async shareTask(taskId: string, sharedWithUserId: string, permission: string, userId: string): Promise<TaskShare> {
    const task = await this.taskModel.findOne({ _id: taskId, userId }).exec();
    if (!task) throw new Error('Task not found or unauthorized');
    const taskShare = new this.taskShareModel({ taskId, sharedWithUserId, permission });
    return taskShare.save();
  }

  async getSharedTasks(userId: string): Promise<TaskShare[]> {
    return this.taskShareModel.find({ sharedWithUserId: userId }).populate('taskId', 'title status priority').exec();
  }
}