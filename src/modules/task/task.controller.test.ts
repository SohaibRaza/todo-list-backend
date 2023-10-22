import { Request, Response, NextFunction } from 'express';
import TaskController from './task.controller';
import TaskService from './task.service';
import ResponseHandler from '../../common/helpers/responseHandler';
import { TASK } from '../../common/constants/task.messages';

// jest.mock('./TaskService');

describe('TaskController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    next = jest.fn();
  });

  describe('createTask', () => {
    it('should create a new task and return a 201 response', async () => {
      const newTask = { title: 'Test Task', description: 'Test Description' };
      const createdTask = { ...newTask, _id: 'generatedId' };

      (TaskService.createTask as jest.Mock).mockResolvedValue(createdTask);

      await TaskController.createTask(req, res, next);

      expect(TaskService.createTask).toHaveBeenCalledWith(newTask);
      expect(ResponseHandler.success).toHaveBeenCalledWith(res, {
        data: createdTask,
        message: TASK.CREATED,
        statusCode: 201,
      });
    });

    it('should handle errors by calling next', async () => {
      const error = new Error('Test error');

      (TaskService.createTask as jest.Mock).mockRejectedValue(error);

      await TaskController.createTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];

      (TaskService.getAllTasks as jest.Mock).mockResolvedValue(tasks);

      await TaskController.getAllTasks(req, res, next);

      expect(ResponseHandler.success).toHaveBeenCalledWith(res, {
        data: tasks,
      });
    });

    it('should handle errors by calling next', async () => {
      const error = new Error('Test error');

      (TaskService.getAllTasks as jest.Mock).mockRejectedValue(error);

      await TaskController.getAllTasks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateTask', () => {
    it('should update a task and return a success response', async () => {
      const taskId = 'taskId';
      const updatedTask = { title: 'Updated Task' };

      (req.params as any).id = taskId;
      (TaskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      await TaskController.updateTask(req, res, next);

      expect(TaskService.updateTask).toHaveBeenCalledWith(taskId, updatedTask);
      expect(ResponseHandler.success).toHaveBeenCalledWith(res, {
        data: updatedTask,
        message: TASK.UPDATED,
      });
    });

    it('should handle errors by calling next', async () => {
      const error = new Error('Test error');

      (TaskService.updateTask as jest.Mock).mockRejectedValue(error);

      await TaskController.updateTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return a success response', async () => {
      const taskId = 'taskId';

      (req.params as any).id = taskId;

      await TaskController.deleteTask(req, res, next);

      expect(TaskService.deleteTask).toHaveBeenCalledWith(taskId);
      expect(ResponseHandler.success).toHaveBeenCalledWith(res, {
        message: TASK.DELETED,
      });
    });

    it('should handle errors by calling next', async () => {
      const error = new Error('Test error');

      (TaskService.deleteTask as jest.Mock).mockRejectedValue(error);

      await TaskController.deleteTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
