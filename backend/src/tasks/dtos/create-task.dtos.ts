import { z } from 'zod';

export class CreateTaskDto {
  title: string;
  description?: string;
  status?: boolean;
  priority: string;
  duedate: string; // or any other required fields
}
