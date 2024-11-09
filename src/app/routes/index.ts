import express from 'express';
import { TaskRoutes } from '../modules/tasks/tasks.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/task',
    route: TaskRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
