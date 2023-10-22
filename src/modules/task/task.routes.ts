import { Router } from 'express';

import { queryParser } from '~/middlewares/queryParser';
import { validateBody } from '~/middlewares/validateBody';
import TasksController from './task.controller';
import {
    createTaskSchema,
    updateTaskSchema,
    updateTaskStatusSchema
} from './task.validationSchemas';

const router = Router();

router.use(queryParser);

router.post(
  '/tasks',
  validateBody(createTaskSchema),
  TasksController.createTask
);
router.get('/tasks', TasksController.getAllTasks);
router.patch(
  '/tasks/:id/status',
  validateBody(updateTaskStatusSchema),
  TasksController.updateTask
);
router.put(
  '/tasks/:id',
  validateBody(updateTaskSchema),
  TasksController.updateTask
);
router.delete('/tasks/:id', TasksController.deleteTask);

export default router;
