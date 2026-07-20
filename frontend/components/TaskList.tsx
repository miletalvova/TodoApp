'use client';
import type { ITask } from '../types/task';
import TaskCard from './TaskCard';

type Props = {
    tasks: ITask[];
    onDelete: (id: number) => void;
    onEdit: (task: ITask) => void;
};

export default function TaskList({ tasks, onDelete, onEdit }: Props) {
    if (tasks.length === 0) {
        return (
            <p className='text-center text-muted-foreground'>No tasks found.</p>
        )
    }

    return (
        <section className='space-y-4'>

            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}

        </section>
    )
}
