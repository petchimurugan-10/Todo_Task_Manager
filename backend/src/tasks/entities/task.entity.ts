import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);