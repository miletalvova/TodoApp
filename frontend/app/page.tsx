'use client';
import './globals.css';
import { useState, useEffect } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import type { ITask } from '../types/task';
import { getTasks, deleteTask, updateTask, } from '../lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  async function loadTasks() {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(task: ITask) {
    try {
      await updateTask(task);
      
      setSelectedTask(null)

      await loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };
    fetchTasks();
  }, []);

  return (
    <main className='max-w-4xl mx-auto px-6 py-8 space-y-8'>
      <AddTaskForm onTaskCreated={loadTasks} selectedTask={selectedTask} onTaskUpdated={handleUpdate} />

      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={setSelectedTask} />

    </main>
  );
}
