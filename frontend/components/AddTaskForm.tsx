'use client'
import { useEffect, useState } from 'react';
import type { ITask } from '../types/task';
import { createTask } from '../lib/api';

type Props = {
    onTaskCreated: () => void;
    selectedTask: ITask | null;
    onTaskUpdated: (task: ITask) => void;
}

export default function AddTaskForm({ onTaskCreated, selectedTask, onTaskUpdated }: Props) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        priority: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setForm({
                name: selectedTask.name,
                description: selectedTask.description,
                priority: selectedTask.priority,

            })
        } else {
            setForm({
                name: '',
                description: '',
                priority: 1,
            });
        }
    }, [selectedTask]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            if (selectedTask) {
                await onTaskUpdated({
                    ...selectedTask,
                    name: form.name,
                    description: form.description,
                    priority: form.priority,
                });
            } else {
                await createTask({
                    name: form.name,
                    description: form.description,
                    priority: form.priority,
                    completed: false,
                });

                onTaskCreated();
            }

            setForm({
                name: '',
                description: '',
                priority: 1,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='bg-white shadow rounded-xl p-6'>
            <h2 className='text-2xl font-semibold mb-6'>{selectedTask ? 'Edit Task' : 'Create Task'}</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Task name</label>
                    <input id="name" type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border rounded px-3 py-2" required></input>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea id="description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2" rows={4} required />
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
                    <select id='priority' value={form.priority} onChange={(e) => setForm({...form, priority: Number(e.target.value)})} className='border rounded px-3 py-2'>
                        {[...Array(10)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className='text-red-600'>{error}</p>
                )}

                <button type="submit" disabled={loading} className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400'>
                    {loading ? selectedTask ? 'Updating...' : 'Creating...' : selectedTask ? 'Update Task' : 'Add Task'}
                </button>
            </form>

        </section>
    )
}