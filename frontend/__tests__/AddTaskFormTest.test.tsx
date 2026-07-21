import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTaskForm from '../components/AddTaskForm';
import { createTask } from '../lib/api';

jest.mock('@/lib/api', () => ({
  createTask: jest.fn(),
}));

describe('AddTaskForm component', () => {
  const refreshTasks = jest.fn();
  const saveEditedTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form title', () => {
    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });

  it('renders Add Task button', () => {
    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  it('updates task name', () => {
    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    const input = screen.getByLabelText(/task name/i);

    fireEvent.change(input, {
      target: { value: 'Buy milk' },
    });

    expect(input).toHaveValue('Buy milk');
  });

  it('updates description', () => {
    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    const textarea = screen.getByLabelText(/description/i);

    fireEvent.change(textarea, {
      target: { value: 'Go to supermarket' },
    });

    expect(textarea).toHaveValue('Go to supermarket');
  });

  it('updates priority', () => {
    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    const priority = screen.getByLabelText(/priority/i);

    fireEvent.change(priority, {
      target: { value: '5' },
    });

    expect(priority).toHaveValue('5');
  });

  it('submits a new task', async () => {
    (createTask as jest.Mock).mockResolvedValue({});

    render(
      <AddTaskForm refreshTasks={refreshTasks} taskToEdit={null} saveEditedTask={saveEditedTask} />,
    );

    fireEvent.change(screen.getByLabelText(/task name/i), {
      target: { value: 'Buy milk' },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'From supermarket' },
    });

    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: '3' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Add Task',
      }),
    );

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({
        name: 'Buy milk',
        description: 'From supermarket',
        priority: 3,
        completed: false,
      });

      expect(refreshTasks).toHaveBeenCalled();
    });
  });

  it('renders edit mode', () => {
    render(
      <AddTaskForm
        refreshTasks={refreshTasks}
        saveEditedTask={saveEditedTask}
        taskToEdit={{
          id: 1,
          name: 'Old task',
          description: 'Old description',
          priority: 4,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    expect(screen.getByText('Edit Task')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Update Task',
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/task name/i)).toHaveValue('Old task');
  });
});
