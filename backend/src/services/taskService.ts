import { Task } from '../models/task.js';
import type { TaskCreationAttributes } from '../types/task.types.js';
import createError from 'http-errors';

class TaskService {
    async getAll() {
        return Task.findAll();
    }

    async getOneById(id: number) {
        return Task.findByPk(id);
    }

    async create(data: TaskCreationAttributes) {
        return Task.create(data);
    }

    async update(id: number, data: Partial<TaskCreationAttributes>) {
        const task = await Task.findByPk(id);

        if (!task) {
            throw createError(404, 'Task not found');
        }
        return task.update(data);
    }

    async delete(id: number) {
        const task = await Task.findByPk(id);

        if (!task) {
            throw createError(404, 'Task not found');
        }
        return task.destroy();
    }
}

export default new TaskService();
