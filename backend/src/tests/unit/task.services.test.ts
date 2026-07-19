import { jest } from '@jest/globals';
import { Task } from '../../models/task.js';
import TaskService from '../../services/taskService.js';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TaskService', () => {
    describe('create()', () => {
        test('create() calls Task.create()', async () => {
            const task = {
                id: 1,
                name: 'Buy milk',
                description: 'From supermarket',
                priority: 5,
                completed: false,
            };

            const createSpy = jest.spyOn(Task, 'create').mockResolvedValue(task as any);

            const result = await TaskService.create({
                name: 'Buy milk',
                description: 'From supermarket',
                priority: 5,
                completed: false,
            });

            expect(createSpy).toHaveBeenCalledWith({
                name: 'Buy milk',
                description: 'From supermarket',
                priority: 5,
                completed: false,
            });

            expect(result).toEqual(task);
        });

        test('create() throws when priority is invalid', async () => {
            const createSpy = jest.spyOn(Task, 'create');

            await expect(
                TaskService.create({
                    name: 'Milk',
                    description: 'Store',
                    priority: 20,
                    completed: false,
                })
            ).rejects.toThrow('Priority must be between 1 and 10');

            expect(createSpy).not.toHaveBeenCalled();
        });
    });

    describe('update()', () => {
        test('update() updates existing task', async () => {
            const update = jest.fn<() => Promise<any>>();

            update.mockResolvedValue({ id: 1, name: 'Updated' });

            const findSpy = jest.spyOn(Task, 'findByPk').mockResolvedValue({ update } as any);

            const result = await TaskService.update(1, {
                name: 'Updated',
            });

            expect(findSpy).toHaveBeenCalledWith(1);
            expect(update).toHaveBeenCalledWith({ name: 'Updated' });
            expect(result).toEqual({ id: 1, name: 'Updated' });
        });

        test('update() throws when task is missing', async () => {
            const findSpy = jest.spyOn(Task, 'findByPk').mockResolvedValue(null);

            await expect(
                TaskService.update(1, {
                    name: 'Milk',
                })
            ).rejects.toThrow('Task not found');

            expect(findSpy).toHaveBeenCalledWith(1);
        });

        test('update() updates only provided fields', async () => {
            const update = jest.fn<() => Promise<any>>();

            jest.spyOn(Task, 'findByPk').mockResolvedValue({ update } as any);

            await TaskService.update(1, {
                completed: true,
            });

            expect(update).toHaveBeenCalledWith({ completed: true });
        });

        test('update() throws when priority is invalid', async () => {
            const update = jest.fn<() => Promise<any>>();
            jest.spyOn(Task, 'findByPk').mockResolvedValue({ update } as any);

            await expect(
                TaskService.update(1, {
                    priority: 20,
                })
            ).rejects.toThrow('Priority must be between 1 and 10');

            expect(update).not.toHaveBeenCalled();
        });
    });

    describe('delete()', () => {
        test('delete() destroys existing task', async () => {
            const destroy = jest.fn<() => Promise<any>>();

            const findSpy = jest.spyOn(Task, 'findByPk').mockResolvedValue({ destroy } as any);

            await TaskService.delete(1);

            expect(findSpy).toHaveBeenCalledWith(1);
            expect(destroy).toHaveBeenCalled();
        });

        test('delete() throws when task doesn not exist', async () => {
            const findSpy = jest.spyOn(Task, 'findByPk').mockResolvedValue(null);

            await expect(TaskService.delete(1)).rejects.toThrow('Task not found');

            expect(findSpy).toHaveBeenCalledWith(1);
        });
    });

    describe('getAll()', () => {
        test('getAll() filters completed tasks', async () => {
            const findSpy = jest.spyOn(Task, 'findAll').mockResolvedValue([] as any);

            await TaskService.getAll({
                status: 'done',
            });

            expect(findSpy).toHaveBeenCalledWith({
                where: {
                    completed: true,
                },
                order: [],
            });
        });

        test('getAll() filters incomplete tasks', async () => {
            const findSpy = jest.spyOn(Task, 'findAll').mockResolvedValue([] as any);

            await TaskService.getAll({
                status: 'undone',
            });

            expect(findSpy).toHaveBeenCalledWith({
                where: {
                    completed: false,
                },
                order: [],
            });
        });

        test('getAll() sorts tasks by priority ascending', async () => {
            const findSpy = jest.spyOn(Task, 'findAll').mockResolvedValue([] as any);

            await TaskService.getAll({
                sort: 'priority',
                order: 'asc',
            });

            expect(findSpy).toHaveBeenCalledWith({
                where: {},
                order: [['priority', 'ASC']],
            });
        });

        test('getAll() sorts tasks by priority descending', async () => {
            const findSpy = jest.spyOn(Task, 'findAll').mockResolvedValue([] as any);

            await TaskService.getAll({
                sort: 'priority',
                order: 'desc',
            });

            expect(findSpy).toHaveBeenCalledWith({
                where: {},
                order: [['priority', 'DESC']],
            });
        });
    });
});
