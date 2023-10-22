import { TasksService } from './task.service';
import { Task } from './task.model';

describe('TasksService', () => {
  const mockCreateTask = jest.fn();
  const mockFind = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFindByIdAndRemove = jest.fn();

  jest.mock('./task.model', () => ({
    default: jest.fn(),
    Task: {
      save: mockCreateTask,
      find: mockFind,
      findByIdAndUpdate: mockFindByIdAndUpdate,
      findByIdAndRemove: mockFindByIdAndRemove,
    },
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new task', async () => {
    const newTaskData: Task = {
      title: 'Clean the house',
      description: 'Clean the entire house',
      status: 'pending',
    };

    mockCreateTask.mockResolvedValue(newTaskData);

    const createdTask = await TasksService.createTask(newTaskData);

    console.log(createdTask, ' <<< CREATED TASK');

    expect(mockCreateTask).toHaveBeenCalledWith(newTaskData);
    expect(createdTask).toEqual(newTaskData);
  }, 10000);

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks: Partial<Task>[] = [
        { title: 'Buy grocery', description: 'Buy fruits and vegetables' },
        { title: 'Wash dishes', description: 'Wash the dishes' },
        { title: 'Clean the house', description: 'Clean the entire house' },
        { title: 'Go to gym', description: 'Go to the gym' },
        { title: 'Eat breakfast', description: 'Eat breakfast' },
        { title: 'Workout', description: 'Workout' },
        { title: 'Sleep', description: 'Sleep' },
      ];

      mockFind.mockResolvedValue(tasks);

      const allTasks = await TasksService.getAllTasks();

      expect(mockFind).toHaveBeenCalled();
      expect(allTasks).toEqual(tasks);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const taskId = 'task_id';
      const updatedTaskData: Task = {
        title: 'Buy grocery',
        description: 'Buy fruits and vegetables',
        status: 'completed',
      };

      mockFindByIdAndUpdate.mockResolvedValue(updatedTaskData);

      const updatedTask = await TasksService.updateTask(
        taskId,
        updatedTaskData
      );

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        taskId,
        updatedTaskData,
        { new: true }
      );
      expect(updatedTask).toEqual(updatedTaskData);
    });

    it('should return null if the task is not found', async () => {
      const taskId = 'task_id';
      const updatedTaskData: Task = {
        title: 'Clean the house',
        description: 'Clean the entire house',
        status: 'completed',
      };

      mockFindByIdAndUpdate.mockResolvedValue(null);

      const updatedTask = await TasksService.updateTask(
        taskId,
        updatedTaskData
      );

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        taskId,
        updatedTaskData,
        { new: true }
      );
      expect(updatedTask).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const taskId = 'task_id';

      await TasksService.deleteTask(taskId);

      expect(mockFindByIdAndRemove).toHaveBeenCalledWith(taskId);
    });
  });
});
