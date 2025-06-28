import { z } from 'zod';

export const UpdateTaskDto = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['To Do', 'In Progress', 'Completed']).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  dueDate: z.string().optional(),
});