import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { type Task } from '../types/task.types';
import api from '../services/api';

export const useTasks = () => {
  const { user } = useAuth();
  const { data, refetch } = useQuery<Task[], Error>({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      const response = await api.get(`/tasks?userId=${user}`);
      console.log('Fetched tasks:', response.data);
      return response.data;
    },
    enabled: !!user,
  });

  return { tasks: data || [], refetch };
};