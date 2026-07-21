'use client';
import './globals.css';
import { useState, useEffect } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import Search from '../components/Search';
import StatusFilter from '../components/StatusFilter';
import SortOrder from '../components/SortOrder';
import type { ITask } from '../types/task';
import { getTasks, deleteTask, updateTask } from '../lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'done' | 'undone'>('all');
  const [order, setOrder] = useState<'low-high' | 'high-low'>('low-high');

  async function loadTasks() {
    try {
      const apiOrder = order === 'low-high' ? 'asc' : 'desc';
      const tasks = await getTasks({ search, status, sort: 'priority', order: apiOrder });
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

      setSelectedTask(null);

      await loadTasks();
    } catch (err) {
      console.error(err);
    }
  }
  async function handleToggleComplete(task: ITask) {
    try {
      await updateTask(task);
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
  }, [search, status, order]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
      <AddTaskForm
        refreshTasks={loadTasks}
        taskToEdit={selectedTask}
        saveEditedTask={handleUpdate}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Search search={search} onSearchChange={setSearch} />
        <StatusFilter value={status} onStatusChange={setStatus} />
        <SortOrder value={order} onOrderChange={setOrder} />
      </div>

      <TaskList
        tasks={tasks}
        deleteTask={handleDelete}
        editTask={setSelectedTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
