import { Task } from '../models/task.js';
import type { TaskCreationAttributes } from '../types/task.types.js';
import createError from 'http-errors';
import { Op } from 'sequelize';

type TaskTypes = {
    status?: 'all' | 'done' | 'undone' | undefined;
    sort?: 'priority' | undefined;
    order?: 'asc' | 'desc' | undefined;
    search?: string;
};

class TaskService {
    async getAll({ status = 'all', sort, order = 'asc', search = '' }: TaskTypes) {
        const where: any = {};
        const orderBy: any[] = [];

        switch (status) {
            case 'done':
                where.completed = true;
                break;

            case 'undone':
                where.completed = false;
                break;

            default:
                break;
        }

        if (search) {
            where[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                {
                    description: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ];
        }

        if (sort === 'priority') {
            orderBy.push(['priority', order === 'desc' ? 'DESC' : 'ASC']);
        }

        return Task.findAll({
            where,
            order: orderBy,
        });
    }

    async getOneById(id: number) {
        return Task.findByPk(id);
    }

    async create(data: TaskCreationAttributes) {
        if (data.priority < 1 || data.priority > 10) {
            throw createError(400, 'Priority must be between 1 and 10');
        }

        return Task.create(data);
    }

    async update(id: number, data: Partial<TaskCreationAttributes>) {
        const task = await Task.findByPk(id);

        if (!task) {
            throw createError(404, 'Task not found');
        }

        if (data.priority !== undefined && (data.priority < 1 || data.priority > 10)) {
            throw createError(400, 'Priority must be between 1 and 10');
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
