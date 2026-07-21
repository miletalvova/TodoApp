'use client';
import type { ITask } from '../types/task';
import TaskCard from './TaskCard';

type Props = {
  tasks: ITask[];
  deleteTask: (id: number) => void;
  editTask: (task: ITask) => void;
  onToggleComplete: (task: ITask) => void;
};

export default function TaskList({ tasks, deleteTask, editTask, onToggleComplete }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No tasks found.
        <br />
        Create your first task to get started.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </section>
  );
}
