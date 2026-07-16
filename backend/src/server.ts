import app from './app.js';
import type { Request, Response } from 'express';
import { sequelize } from './models/index.js';
import { seedTasks } from './seeders/tasks.js';

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

await sequelize.authenticate();
await sequelize.sync({ force: false });

await seedTasks();

console.log('Connected to MySQL.');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
