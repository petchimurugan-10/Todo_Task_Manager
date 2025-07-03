export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

// This is the type your form should use!
export type CreateTaskDto = Omit<Task, '_id' | 'createdAt' | 'updatedAt'>;
