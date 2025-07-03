import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, default: 'pending' },
  priority: String,
  dueDate: Date,
  userId: String,
  _id: { type: Schema.Types.ObjectId, required: true },
});