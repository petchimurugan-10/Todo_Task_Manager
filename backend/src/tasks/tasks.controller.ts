import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  async findAll(@Request() req): Promise<any[]> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.findOne(+id, req.user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.update(+id, updateTaskDto, req.user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.delete(+id, req.user);
  }

  @Post(':id/share')
  async share(@Param('id') id: string, @Body() body: { email: string }, @Request() req): Promise<void> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.share(+id, body.email, req.user);
  }
}
