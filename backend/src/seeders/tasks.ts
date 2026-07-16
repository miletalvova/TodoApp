import { Task } from '../models/task.js';

export async function seedTasks() {
    const tasks = [
        {
            name: 'Buy groceries',
            description: 'Milk, eggs, whole wheat bread, and chicken breasts',
            priority: 5,
            completed: false,
        },
        {
            name: 'Schedule dentist appointment',
            description: 'Checkup and celaning',
            priority: 3,
            completed: false,
        },
        {
            name: 'Submit quarterly project report',
            description:
                "Complete the team's progress slides and email them the head of department",
            priority: 5,
            completed: true,
        },
        {
            name: 'Plan weekend hiking trip',
            description: 'Check weather forecast, pick a trail and pack lunch',
            priority: 2,
            completed: false,
        },
    ];
    for (const task of tasks) {
        await Task.findOrCreate({
            where: {
                name: task.name,
                description: task.description,
                priority: task.priority,
                completed: task.completed,
            },
        });
    }
}
