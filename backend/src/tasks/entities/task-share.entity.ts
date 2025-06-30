import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskShareDocument = TaskShare & Document;

@Schema()
export class TaskShare {
  @Prop({ type: String, ref: 'Task', required: true })
  taskId: string;

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  permission: string; // 'read' | 'write' | 'admin'

  @Prop({ default: Date.now })
  sharedAt: Date;
}

export const TaskShareSchema = SchemaFactory.createForClass(TaskShare);
