import { sequelize } from '../models/index.js';
import { Task } from '../models/task.js';

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
});

beforeEach(async () => {
    await Task.destroy({
        where: {},
        truncate: true,
    })
});

afterAll(async () => {
    await sequelize.close();
});