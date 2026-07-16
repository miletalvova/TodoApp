import { Router } from 'express';
const router = Router();
import type { Request, Response, NextFunction } from 'express';
import TaskService from '../services/taskService.js';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await TaskService.getAll();
        return res.status(200).json({ status: "success", statusCode: 200, message: "List of tasks", data: tasks })
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const idNum = Number(req.params.id);

        if (Number.isNaN(idNum)) {
            return res.status(400).json({ status: "error", statusCode: 400, message: "Task ID must be a number" })
        }

        const task = await TaskService.getOneById(idNum);

        if (!task) {
            return res.status(404).json({ status: "error", statusCode: 404, message: "Task not found" })
        }
        return res.status(200).json({ status: "success", statusCode: 200, message: "List of tasks", data: task })
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, priority } = req.body;

        if (!name || !description || !priority) {
            return res.status(400).json({ status: "error", statusCode: 400, message: "Missing required fields: name, description, priority" })
        }
        const tasks = await TaskService.create({ name, description, priority, completed: false });

        return res.status(201).json({ status: "success", statusCode: 201, message: "Task created", data: tasks })
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ status: "error", statusCode: 400, message: "Task ID must be a number" })
        }

        const { name, description, priority, completed } = req.body;

        if (name == null && description == null && priority == null && completed == null) {
            return res.status(400).json({ status: "error", statusCode: 400, message: "AT least one filed (name, description, priority, completed) must be provided for update." })
        }

        const updatedTask = await TaskService.update(id, { name, description, priority, completed })
        return res.status(200).json({ status: "success", statusCode: 200, message: "Task updated", data: updatedTask })
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ status: "error", statusCode: 400, message: "Task ID must be a number" })
        }

        await TaskService.delete(id)
        return res.status(200).json({ status: "success", statusCode: 200, message: "Task deleted" })
    } catch (err) {
        return next(err);
    }
});

export default router;