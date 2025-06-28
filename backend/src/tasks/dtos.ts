import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(1,'Title is required'),
    description: z.string().optional(),
    status: z.enum(['To Do','In Progress','Completed']).default('To Do'),
    priority: z.enum(['Low','Medium','High']).default('Medium'),
    dueDate: z.string().optional(),
});

export const UpdateTaskSchema=z.object({
    title: z.string().min(1,'Title is required'),
    description: z.string().optional(),
    status: z.enum(['To Do','In Progress','Completed']).default('To Do'),
    priority: z.enum(['Low','Medium','High']).default('Medium'),
    dueDate: z.string().optional(),
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;