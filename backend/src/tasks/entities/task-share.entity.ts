import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskShareDocument = TaskShare & Document;

@Schema()
export class TaskShare {
  @Prop({ type: String, ref: 'Task', required: true })
  taskId: string;

  @Prop({ type: String, ref: 'User', required: true })
  sharedWithUserId: string;

  @Prop({ required: true, enum: ['read', 'write'] })
  permission: string;
}

export const TaskShareSchema = SchemaFactory.createForClass(TaskShare);