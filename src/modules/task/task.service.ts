import TaskModel, { Task } from './task.model';

export class TasksService {
  static async createTask(newTaskData: Task): Promise<Task> {
    const task = new TaskModel(newTaskData);
    return await task.save();
  }

  static async getAllTasks(query: Task): Promise<Task[]> {
    return await TaskModel.find(query);
  }

  static async updateTask(
    taskId: string,
    updatedTaskData: Task
  ): Promise<Task | null> {
    return await TaskModel.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
  }

  static async deleteTask(taskId: string): Promise<void> {
    await TaskModel.findByIdAndRemove(taskId);
  }
}

export default TasksService
