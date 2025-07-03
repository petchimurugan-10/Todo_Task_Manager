import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TodoFilters from '../components/TodoFilters';
import type { Task, CreateTaskDto } from '../types/task.types';
import { taskService } from '../services/taskService';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: taskService.getAllTasks,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (task: CreateTaskDto) => taskService.createTask(task),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: ['tasks'] }),
      toast.success('Task created successfully!'),
    ],
    onError: () => {
      toast.error('Failed to create task');
    }
  });
  

  // Update task mutation
  const updateTaskMutation = useMutation({
    // Use _id as identifier
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<Task> }) =>
      taskService.updateTask(_id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update task');
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (_id: string) => taskService.deleteTask(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
    
    onError: () => {
      toast.error('Failed to delete task');
    }
  });

  // Filter and search logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'active' && !task.completed) ||
      (activeFilter === 'completed' && task.completed);

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>Error loading tasks. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TaskForm onSubmit={taskData => createTaskMutation.mutate(taskData)} />

      <TodoFilters
        onSearch={setSearchTerm}
        onFilter={setActiveFilter}
        activeFilter={activeFilter}
      />

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No tasks found. Create your first task above!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={(_id, updates) => updateTaskMutation.mutate({ _id, updates })}
              onDelete={_id => deleteTaskMutation.mutate(_id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
