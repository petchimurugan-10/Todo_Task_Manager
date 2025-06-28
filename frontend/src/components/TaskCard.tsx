import { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onShare: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onShare }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center transition-transform hover:scale-105">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description || 'No description'}</p>
        <p className="text-sm text-gray-500">Status: {task.status}</p>
        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        <p className="text-sm text-gray-500">Due: {task.dueDate || 'N/A'}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          aria-label={`Edit task ${task.title}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          aria-label={`Delete task ${task.title}`}
        >
          Delete
        </button>
        <button
          onClick={() => onShare(task.id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          aria-label={`Share task ${task.title}`}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default TaskCard;