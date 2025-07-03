export interface Task {
  _id: string; // Or Schema.Types.ObjectId if using Mongoose types
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  userId: string;
}