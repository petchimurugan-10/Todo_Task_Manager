import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from './useAuth';
import { Task } from '../types/task.types';

export const useTasks = () => {
  const { user } = useAuth();
  const { data, refetch } = useQuery<Task[], Error>({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    },
    enabled: !!user,
  });

  return { tasks: data || [], refetch };
};