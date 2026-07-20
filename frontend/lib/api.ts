import { TASK_API_URL } from "@/lib/constants";
import { ITask, CreateTaskDto } from "@/types/task";

export async function getTasks(): Promise<ITask[]> {
  const response = await fetch(TASK_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await response.json();

  return result.data;
}

export async function createTask(task: CreateTaskDto): Promise<ITask> {
  const response = await fetch(TASK_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
}

export async function updateTask(task: ITask): Promise<ITask> {
  const response = await fetch(`${TASK_API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: task.name,
      description: task.description,
      priority: task.priority,
      completed: task.completed,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return await response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${TASK_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}
