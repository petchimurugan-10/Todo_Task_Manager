import { z } from 'zod';

export const CreateTaskDto = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['To Do', 'In Progress', 'Completed']).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  dueDate: z.string().optional(),
});