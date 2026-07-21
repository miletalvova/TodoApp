import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    <Card className="w-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center gap-6 py-6">
        <div className="flex items-center justify-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() =>
              onToggleComplete?.({
                ...task,
                completed: !task.completed,
              })
            }
          />
        </div>

        <div className="flex-1 space-y-4">
          <CardTitle className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.name}
          </CardTitle>

          <p className="text-sm text-muted-foreground">{task.description}</p>

          <Badge variant="outline" className={priority.className}>
            {priority.label} {task.priority}
          </Badge>
        </div>

        <div className="flex flex-col items-end justify-between gap-4 self-stretch">
          <Badge
            className={
              task.completed
                ? 'bg-emerald-100 text-emerald-700 h-10 w-24'
                : 'bg-amber-100 text-amber-700 h-10 w-24'
            }
          >
            {task.completed ? 'Completed' : 'Pending'}
          </Badge>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="border-sky-200 text-sky-700 hover:bg-sky-50 w-20"
              onClick={() => onEdit?.(task)}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              size="lg"
              className="w-20"
              onClick={() => onDelete?.(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
