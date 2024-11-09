import httpStatus from 'http-status';
// Your service code here

import { SortOrder } from 'mongoose';
import slugify from 'slugify';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { taskSearchableFields } from './tasks.constant';
import { ITask, ITaskFilters } from './tasks.interface';
import { Task } from './tasks.model';

const createTask = async (payload: ITask): Promise<ITask | null> => {
  const { title } = payload;

  const baseSlug = slugify(title, { lower: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Check for duplicate slugs and modify if necessary
  while (await Task.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const result = await Task.create({
    ...payload,
    slug: uniqueSlug,
  });

  return result;
};

const getSingleTask = async (slug: string): Promise<ITask | null> => {
  console.log(slug);
  const result = await Task.findOne({ slug: slug });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return result;
};

const getAllTasks = async (
  filters: ITaskFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITask[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: taskSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Task.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TaskService = {
  createTask,
  getSingleTask,
  getAllTasks,
};
