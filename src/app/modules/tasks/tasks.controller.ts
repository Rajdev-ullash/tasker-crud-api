import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskFilterableFields } from './tasks.constant';
import { ITask } from './tasks.interface';
import { TaskService } from './tasks.service';
// Your controller code here
const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req.body);
  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task created successfully',
    data: result,
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await TaskService.getSingleTask(id);

  // console.log(result);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single task fetched successfully',
    data: result,
  });
});

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, taskFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TaskService.getAllTasks(filters, paginationOptions);

  sendResponse<ITask[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'tasks fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const TaskController = {
  createTask,
  getSingleTask,
  getAllTasks,
};
