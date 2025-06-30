import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createTaskDto: any, @Req() req: Request) {
    const userEmail = req.user ? req.user['email'] : ''; // Handle possible undefined
    return this.tasksService.create(createTaskDto, userEmail); // Assuming email is the userId
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request) {
    const userEmail = req.user ? req.user['email'] : ''; // Handle possible undefined
    return this.tasksService.findAll(userEmail);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateTaskDto: any, @Req() req: Request) {
    const userEmail = req.user?.email || ''; // Handle possible undefined
    return this.tasksService.update(id, updateTaskDto, userEmail);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Req() req: Request) {
    const userEmail = req.user?.email || ''; // Handle possible undefined
    return this.tasksService.remove(id, userEmail);
  }

  @Post(':id/share')
  @UseGuards(AuthGuard('jwt'))
  async share(@Param('id') id: string, @Body() body: { email: string }, @Req() req: Request) {
    const userEmail = req.user?.email || ''; // Handle possible undefined
    return this.tasksService.shareTask(id, body.email, 'read', userEmail); // Default to 'read' permission
  }

  @Get('shared')
  @UseGuards(AuthGuard('jwt'))
  async getSharedTasks(@Req() req: Request) {
    const userEmail = req.user?.email; // Handle possible undefined
    if (!userEmail) {
      throw new Error('User email is not defined'); // Handle the case when userEmail is undefined
    }
    return this.tasksService.getSharedTasks(userEmail);
  }
}