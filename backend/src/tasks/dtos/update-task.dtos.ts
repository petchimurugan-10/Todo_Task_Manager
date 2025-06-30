import { z } from 'zod';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: boolean;
  priority?: string;
  dueDate: string;
  // You usually do NOT update userId for a task
  // userId?: string; // Only include if you want to allow changing ownership
}