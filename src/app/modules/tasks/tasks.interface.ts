// Define your interfaces here
import { Model } from 'mongoose';
export type ITask = {
  title: string;
  slug: string;
  description: string;
  isFavorite: boolean;
  status: string;
};

export type TaskModel = Model<ITask, Record<string, unknown>>;

export type ITaskFilters = {
  searchTerm?: string;
  isFavorite?: boolean;
  status?: string;
};
