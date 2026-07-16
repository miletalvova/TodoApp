import express from 'express';
import cors from 'cors';
import createError, { type HttpError } from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import taskRouter from './routes/tasks.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json' with { type: 'json' };

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/tasks', taskRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: Error | HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    const status = 'status' in err ? err.status : 500;
    res.status(status || 500).json({
        status: 'error',
        statusCode: status || 500,
        message: err.message ?? 'Internal Server Error',
    });
});

export default app;
