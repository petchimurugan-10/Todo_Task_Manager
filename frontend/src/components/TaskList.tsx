import React from 'react';
import { type Task } from '../types/task.types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onShare: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onShare }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={task._id || `task-${index}`} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center transition-transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description || 'No description'}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-500">Priority: {task.priority}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate || 'N/A'}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(task)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button onClick={() => onDelete(task._id || '')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              <button onClick={() => onShare(task._id || '')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;