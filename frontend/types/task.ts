export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  name: string;
  description: string;
  priority: number;
  completed: boolean;
}
