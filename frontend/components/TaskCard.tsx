import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ITask } from '@/types/task';
import { getPriorityInfo } from './task-utils';

type Props = {
  task: ITask;
  onEdit?: (task: ITask) => void;
  onDelete?: (id: number) => void;
  onToggleComplete?: (task: ITask) => void;
};

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: Props) {
  const priority = getPriorityInfo(task.priority);

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{task.name}</CardTitle>

        <Badge className={
                task.completed
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }>
          {task.completed ? 'Completed' : 'Pending'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{task.description}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={priority.className}>{priority.label} {task.priority}</Badge>

          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onToggleComplete?.({ ...task, completed: !task.completed })}
              className={
                task.completed
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }
            >
              {task.completed ? 'Undo' : 'Done'}
            </Button>

            <Button variant="outline"
              size="sm"
              className="border-sky-200 text-sky-700 hover:bg-sky-50"
              onClick={() => onEdit?.(task)}>
              Edit
            </Button>

            <Button variant="destructive" size="sm" onClick={() => onDelete?.(task.id)}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
