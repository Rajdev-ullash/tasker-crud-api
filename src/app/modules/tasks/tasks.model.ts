import { Schema, model } from 'mongoose';
import { ITask, TaskModel } from './tasks.interface';

const TaskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    isFavorite: { type: Boolean },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Task = model<ITask, TaskModel>('Task', TaskSchema);
