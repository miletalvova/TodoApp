import { Router } from 'express';
const router = Router();
import type { Request, Response, NextFunction } from 'express';
import TaskService from '../services/taskService.js';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get all tasks'
    // #swagger.description = 'Endpoint to get all tasks'
    // #swagger.produces = ['application/json']
    /* #swagger.responses[200] = {
        description: 'List of tasks retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'number', example: 200 },
                        message: { type: 'string', example: 'List of tasks' },
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Task' } 
                            }
                        }
                    }
                }
            }
        }
    }*/
    /* #swagger.responses[500] = { $ref: '#/components/responses/InternalServerError' } */

    try {
        const tasks = await TaskService.getAll();
        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'List of tasks',
            data: tasks,
        });
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get task by ID'
    // #swagger.description = 'Endpoint to get details of a specific task by its ID'
    // #swagger.produces = ['application/json']
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Task ID',
        required: true,
        schema: { type: 'integer', example: 1 }
    } */
    /* #swagger.responses[200] = {
        description: 'Details of a task retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'number', example: 200 },
                        message: { type: 'string', example: 'Task details' },
                        data: { $ref: '#/components/schemas/Task' }
                        }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' } */
    /* #swagger.responses[404] = { $ref: '#/components/responses/NotFound' } */
    /* #swagger.responses[500] = { $ref: '#/components/responses/InternalServerError' } */

    try {
        const idNum = Number(req.params.id);

        if (Number.isNaN(idNum)) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Task ID must be a number',
            });
        }

        const task = await TaskService.getOneById(idNum);

        if (!task) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Task not found',
            });
        }
        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Task details',
            data: task,
        });
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Creates a new task'
    // #swagger.description = 'Endpoint to create a new task'
    // #swagger.produces = ['application/json']
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/TaskInput' }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'Task created successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'number', example: 201 },
                        message: { type: 'string', example: 'Task created' },
                        data: { $ref: '#/components/schemas/Task' }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' } */
    /* #swagger.responses[500] = { $ref: '#/components/responses/InternalServerError' } */

    try {
        const { name, description, priority } = req.body;

        if (!name || !description || !priority) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Missing required fields: name, description, priority',
            });
        }
        const tasks = await TaskService.create({
            name,
            description,
            priority,
            completed: false,
        });

        return res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Task created',
            data: tasks,
        });
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Updates a task'
    // #swagger.description = 'Endpoint to update a task'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Task ID',
        required: true,
        schema: { type: 'integer', example: 1 }
    } */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/TaskUpdateInput' }
            }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'Task updated successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'number', example: 200 },
                        message: { type: 'string', example: 'Task updated' },
                        data: { $ref: '#/components/schemas/Task' }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' } */
    /* #swagger.responses[404] = { $ref: '#/components/responses/NotFound' } */
    /* #swagger.responses[500] = { $ref: '#/components/responses/InternalServerError' } */

    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Task ID must be a number',
            });
        }

        const { name, description, priority, completed } = req.body;

        if (name == null && description == null && priority == null && completed == null) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message:
                    'AT least one filed (name, description, priority, completed) must be provided for update.',
            });
        }

        const updatedTask = await TaskService.update(id, {
            name,
            description,
            priority,
            completed,
        });
        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Task updated',
            data: updatedTask,
        });
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Delete a task'
    // #swagger.description = 'Endpoint to delete a task'
    // #swagger.produces = ['application/json']
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Task ID',
        required: true,
        schema: { type: 'integer', example: 1 }
    } */
    /* #swagger.responses[200] = {
        description: 'Task deleted successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'number', example: 200 },
                        message: { type: 'string', example: 'Task deleted' }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' } */
    /* #swagger.responses[404] = { $ref: '#/components/responses/NotFound' } */
    /* #swagger.responses[500] = { $ref: '#/components/responses/InternalServerError' } */

    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Task ID must be a number',
            });
        }

        await TaskService.delete(id);

        return res
            .status(200)
            .json({ status: 'success', statusCode: 200, message: 'Task deleted' });
    } catch (err) {
        return next(err);
    }
});

export default router;
