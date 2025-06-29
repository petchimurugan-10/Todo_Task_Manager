import { Controller, Get, Post, Body, Delete, Param, Req, UseGuards, BadRequestException,Put } from '@nestjs/common';
import { Request } from 'express'; // Use Request from express for type definitions
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<any[]> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.findOne(Number(id), req.user); // Ensure id is converted to number
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ): Promise<any> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.update(Number(id), updateTaskDto, req.user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request): Promise<void> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.delete(Number(id), req.user);
  }

  @Post(':id/share')
  async share(
    @Param('id') id: string,
    @Body() body: { email: string },
    @Req() req: Request,
  ): Promise<void> {
    if (!req.user) throw new BadRequestException('User not authenticated');
    return this.tasksService.share(Number(id), body.email, req.user);
  }
}