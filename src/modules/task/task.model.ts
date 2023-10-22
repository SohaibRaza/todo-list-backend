import mongoose, { Document, Schema } from 'mongoose';
import { BaseSchema } from '../../db/BaseSchema';

export interface Task {
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

const COLLECTION_NAME = 'task';

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'pending' },
  },
  { collection: COLLECTION_NAME }
);

TaskSchema.add(BaseSchema);

export default mongoose.model<Task & Document>(COLLECTION_NAME, TaskSchema);
