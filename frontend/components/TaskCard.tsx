import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ITask } from "@/types/task";

type Props = {
    task: ITask;
    onEdit?: (task: ITask) => void;
    onDelete?: (id: number) => void;
};

export default function TaskCard({
    task, onEdit, onDelete
}: Props) {
    return (
        <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle>{task.name}</CardTitle>

                <Badge variant={task.completed ? 'default' : 'secondary'}>
                    {task.completed ? 'Completed' : 'Pending'}
                </Badge>

            </CardHeader>

            <CardContent className='space-y-4'>
                <p className='text-sm text-muted-foreground'>{task.description}</p>

                <div className='flex items-center justify-between'>
                    <Badge variant='outline'>
                        Priority: {task.priority}
                    </Badge>
                    
                    <div className='flex gap-2'>
                        <Button variant='outline' size='sm' onClick={() => onEdit?.(task)}>
                            Edit
                        </Button>

                        <Button variant='destructive' size='sm' onClick={() => onDelete?.(task.id)}>
                            Delete
                        </Button>
                    </div>

                </div>

            </CardContent>

        </Card>
    )
}