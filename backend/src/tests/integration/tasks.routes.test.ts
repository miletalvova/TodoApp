import request from 'supertest';
import app from '../../app.js';

describe('TASKS', () => {
    test('POST /api/tasks - success', async () => {
        const task = {
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        };
        const response = await request(app).post('/api/tasks').send(task);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data.name).toBe('Buy milk');
        expect(response.body.data.priority).toBe(5);
        expect(response.body.data.completed).toBe(false);
    });

    test('GET /api/tasks - success', async () => {
        await request(app).post('/api/tasks').send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        });

        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.some((task: any) => task.name === 'Buy milk')).toBe(true);
        expect(
            response.body.data.some((task: any) => task.description === 'From supermarket')
        ).toBe(true);
        expect(response.body.data.some((task: any) => task.priority === 5)).toBe(true);
        expect(response.body.data.some((task: any) => task.completed === false)).toBe(true);
    });

    test('GET /api/tasks?status=done - returns only completed tasks - success', async () => {
        const createResponse = await request(app).post('/api/tasks').send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        });

        const id = createResponse.body.data.id;
        await request(app).put(`/api/tasks/${id}`).send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
            completed: true,
        });

        const response = await request(app).get('/api/tasks?status=done');

        expect(response.status).toBe(200);

        for (const task of response.body.data) {
            expect(task.completed).toBe(true);
        }
        expect(response.body.data.some((task: any) => task.id === id)).toBe(true);
    });

    test('GET /api/tasks?status=undone - returns only incomplete tasks - success', async () => {
        const createResponse = await request(app).post('/api/tasks').send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        });

        const id = createResponse.body.data.id;

        const response = await request(app).get('/api/tasks?status=undone');

        expect(response.status).toBe(200);

        for (const task of response.body.data) {
            expect(task.completed).toBe(false);
        }
        expect(response.body.data.some((task: any) => task.id === id)).toBe(true);
    });

    test('GET /api/tasks?sort=priority&order=desc - returns tasks sorted by priority in desc order - success', async () => {
        await request(app).post('/api/tasks').send({
            name: 'Task A',
            description: 'Task A description',
            priority: 8,
        });

        await request(app).post('/api/tasks').send({
            name: 'Task B',
            description: 'Task B description',
            priority: 5,
        });

        await request(app).post('/api/tasks').send({
            name: 'Task C',
            description: 'Task C description',
            priority: 2,
        });

        const response = await request(app).get('/api/tasks?sort=priority&order=desc');
        const tasks = response.body.data;

        expect(response.status).toBe(200);

        for (let i = 1; i < tasks.length; i++) {
            expect(tasks[i].priority).toBeLessThanOrEqual(tasks[i - 1].priority);
        }
    });

    test('GET /api/tasks?sort=priority&order=asc - returns tasks sorted by priority in asc order - success', async () => {
        await request(app).post('/api/tasks').send({
            name: 'Task A',
            description: 'Task A description',
            priority: 8,
        });

        await request(app).post('/api/tasks').send({
            name: 'Task B',
            description: 'Task B description',
            priority: 5,
        });

        await request(app).post('/api/tasks').send({
            name: 'Task C',
            description: 'Task C description',
            priority: 2,
        });

        const response = await request(app).get('/api/tasks?sort=priority&order=asc');
        const tasks = response.body.data;

        expect(response.status).toBe(200);

        for (let i = 1; i < tasks.length; i++) {
            expect(tasks[i].priority).toBeGreaterThanOrEqual(tasks[i - 1].priority);
        }
    });

    test('GET /api/tasks/:id - success', async () => {
        const task = {
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        };
        const createResponse = await request(app).post('/api/tasks').send(task);

        const id = createResponse.body.data.id;

        const { body } = await request(app).get(`/api/tasks/${id}`);
        expect(body.statusCode).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message).toBe('Task details');
        expect(body.data.name).toBe('Buy milk');
        expect(body.data.priority).toBe(5);
    });

    test('PUT /api/tasks/:id - success', async () => {
        const task = {
            name: 'Buy milk and cookies',
            description: 'From supermarket',
            priority: 7,
            completed: true,
        };

        const createResponse = await request(app).post('/api/tasks').send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        });

        const id = createResponse.body.data.id;

        const { body } = await request(app).put(`/api/tasks/${id}`).send(task);

        const response = await request(app).get(`/api/tasks/${id}`);

        expect(body.statusCode).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message).toBe('Task updated');
        expect(body.data).toHaveProperty('name', 'Buy milk and cookies');
        expect(body.data).toHaveProperty('completed', true);
        expect(body.data.completed).toBe(true);

        expect(response.body.data.completed).toBe(true);
    });

    test('DELETE /api/tasks/:id - success', async () => {
        const task = {
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        };
        const createResponse = await request(app).post('/api/tasks').send(task);

        const id = createResponse.body.data.id;

        const { body } = await request(app).delete(`/api/tasks/${id}`);
        expect(body.statusCode).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message).toBe('Task deleted');

        //After deletion
        const response = await request(app).get(`/api/tasks/${id}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    test('POST /api/tasks - missing name - error', async () => {
        const task = {
            description: 'From supermarket',
            priority: 5,
        };
        const response = await request(app).post('/api/tasks').send(task);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required fields: name, description, priority');
    });

    test('POST /api/tasks - priority < 1 - error', async () => {
        const task = {
            name: 'Buy milk',
            description: 'From supermarket',
            priority: -1,
        };
        const response = await request(app).post('/api/tasks').send(task);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Priority must be between 1 and 10');
    });

    test('POST /api/tasks - priority < 10 - error', async () => {
        const task = {
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 25,
        };
        const response = await request(app).post('/api/tasks').send(task);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Priority must be between 1 and 10');
    });

    test('GET /api/tasks/:id - invalid id - error', async () => {
        const id = 'id';

        const { body } = await request(app).get(`/api/tasks/${id}`);

        expect(body.statusCode).toBe(400);
        expect(body.status).toBe('error');
        expect(body.message).toBe('Task ID must be a number');
    });

    test('GET /api/tasks/:id - nonexistent id - error', async () => {
        const id = 100000;

        const { body } = await request(app).get(`/api/tasks/${id}`);
        expect(body.statusCode).toBe(404);
        expect(body.status).toBe('error');
        expect(body.message).toBe('Task not found');
    });

    test('PUT /api/tasks/:id - invalid body - error', async () => {
        const task = {};

        const createResponse = await request(app).post('/api/tasks').send({
            name: 'Buy milk',
            description: 'From supermarket',
            priority: 5,
        });

        const id = createResponse.body.data.id;

        const { body } = await request(app).put(`/api/tasks/${id}`).send(task);
        expect(body.statusCode).toBe(400);
        expect(body.status).toBe('error');
        expect(body.message).toBe(
            'At least one field (name, description, priority, completed) must be provided for update.'
        );
    });

    test('PUT /api/tasks/:id - nonexistent id - error', async () => {
        const task = {
            name: 'Buy milk and cookies',
            description: 'From supermarket',
            priority: 7,
            completed: true,
        };

        const id = 10000000000;

        const { body } = await request(app).put(`/api/tasks/${id}`).send(task);
        expect(body.statusCode).toBe(404);
        expect(body.status).toBe('error');
        expect(body.message).toBe('Task not found');
    });

    test('DELETE /api/tasks/:id - nonexistent task - error', async () => {
        const id = 100000;

        const { body } = await request(app).delete(`/api/tasks/${id}`);
        expect(body.statusCode).toBe(404);
        expect(body.status).toBe('error');
        expect(body.message).toBe('Task not found');
    });
});
