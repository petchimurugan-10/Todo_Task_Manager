import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ShareTaskModalProps {
  taskId: number;
  onClose: () => void;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({ taskId, onClose }) => {
  const [email, setEmail] = useState('');

  const shareMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/tasks/${taskId}/share`,
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    },
    onSuccess: () => {
      toast.success('Task shared successfully!');
      onClose();
    },
    onError: () => {
      toast.error('Failed to share task.');
    },
  });

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    shareMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Task</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to share with"
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Email for sharing task"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              aria-label="Cancel sharing"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              aria-label="Share task"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareTaskModal;