export interface TaskAttributes {
    id: number;
    name: string;
    description: string;
    priority: number;
    completed: boolean;
}

export interface TaskCreationAttributes extends Omit<TaskAttributes, 'id'> {}
