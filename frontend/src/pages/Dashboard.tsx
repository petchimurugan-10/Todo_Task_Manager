import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import ShareTaskModal from '../components/ShareTaskModal';
import ErrorBoundary from '../components/ErrorBoundary';
import { useTasks } from '../hooks/useTasks';
import { useWebSocket } from '../hooks/useWebSocket';
import { Task } from '../types/task.types';

const Dashboard: React.FC = () => {
  const { tasks, refetch } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useWebSocket();

  const createMutation = useMutation({
    mutationFn: async (task: Partial<Task>) => {
      await axios.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    },
    onSuccess: () => refetch(),
  });

  const updateMutation = useMutation({
    mutationFn: async (task: Partial<Task>) => {
      await axios.put(`/api/tasks/${task.id}`, task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    },
    onSuccess: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    },
    onSuccess: () => refetch(),
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo Task Management</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        aria-label="Create new task"
      >
        Create Task
      </button>
      <FilterBar onFilterChange={handleFilterChange} />
      <ErrorBoundary>
        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
          onDelete={(taskId) => deleteMutation.mutate(taskId)}
          onShare={(taskId) => setShowShareModal(taskId)}
        />
      </ErrorBoundary>
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={async (task) => {
            if (editingTask) {
              await updateMutation.mutate(task);
            } else {
              await createMutation.mutate(task);
            }
            setShowForm(false);
            setEditingTask(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
      {showShareModal && (
        <ShareTaskModal taskId={showShareModal} onClose={() => setShowShareModal(null)} />
      )}
    </div>
  );
};

export default Dashboard;