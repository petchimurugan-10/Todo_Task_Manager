import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTasks } from './useTasks';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:3000');

export const useWebSocket = () => {
  const { refetch } = useTasks();

  useEffect(() => {
    socket.on('taskUpdate', () => {
      refetch();
      toast.info('Task list updated!', { position: 'top-right' });
    });

    socket.on('taskShared', (data) => {
      refetch();
      toast.info(data.message, { position: 'top-right' });
    });

    return () => {
      socket.off('taskUpdate');
      socket.off('taskShared');
    };
  }, [refetch]);
};