import { NextFunction, Request, Response } from 'express';
import Task from './task.model';
import ResponseHandler from '../../common/helpers/responseHandler';
import { TASK } from '../../common/constants/task.messages';
import { TasksService } from './task.service';

export default class TasksController {
  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TasksService.createTask(req.body);

      ResponseHandler.success(res, {
        data: task,
        message: TASK.CREATED,
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: any = req.filters;
      console.log(filters);
      const tasks = await TasksService.getAllTasks(filters);
      ResponseHandler.success(res, { data: tasks });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;
    try {
      const updatedTask = await TasksService.updateTask(taskId, req.body);
      ResponseHandler.success(res, {
        data: updatedTask,
        message: TASK.UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;
    try {
      await TasksService.deleteTask(taskId);
      ResponseHandler.success(res, { message: TASK.DELETED });
    } catch (error) {
      next(error);
    }
  }
}
