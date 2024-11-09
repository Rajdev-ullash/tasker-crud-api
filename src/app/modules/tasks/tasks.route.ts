import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TaskController } from './tasks.controller';
import { TaskValidation } from './tasks.validation';

// Define your routes here
const router = express.Router();

router.get('/single-task/:id', TaskController.getSingleTask);
router.get('/', TaskController.getAllTasks);

router.post(
  '/create-task',
  validateRequest(TaskValidation.createTaskZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TaskController.createTask,
);

export const TaskRoutes = router;
