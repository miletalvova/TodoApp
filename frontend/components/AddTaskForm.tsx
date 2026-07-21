'use client';
import { useEffect, useState } from 'react';
import type { ITask } from '../types/task';
import { createTask } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClipboardList } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Flag } from 'lucide-react';

type Props = {
  refreshTasks: () => void;
  taskToEdit: ITask | null;
  saveEditedTask: (task: ITask) => void;
};

export default function AddTaskForm({ refreshTasks, taskToEdit, saveEditedTask }: Props) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    priority: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* eslint-disable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        name: taskToEdit.name,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
      });
    } else {
      setForm({
        name: '',
        description: '',
        priority: 1,
      });
    }
  }, [taskToEdit]);

  /* eslint-enable react-hooks/set-state-in-effect */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      if (taskToEdit) {
        await saveEditedTask({
          ...taskToEdit,
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

        refreshTasks();
      }

      setForm({
        name: '',
        description: '',
        priority: 1,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{taskToEdit ? 'Edit Task' : 'Create Task'}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-2">
              <Label htmlFor="name">
                <ClipboardList className="h-4 w-4" />
                Task name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">
                <Flag className="h-4 w-4" />
                Priority
              </Label>

              <Select
                value={String(form.priority)}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    priority: Number(value),
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[...Array(10)].map((_, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>
                      {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              <FileText className="h-4 w-4" /> Description
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={4}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full h-12 bg-sky-500/100 hover:bg-sky-60"
          >
            {loading
              ? taskToEdit
                ? 'Updating...'
                : 'Creating...'
              : taskToEdit
                ? 'Update Task'
                : 'Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
