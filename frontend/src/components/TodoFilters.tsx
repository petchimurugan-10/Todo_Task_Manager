import React, { useState } from 'react';

interface TodoFiltersProps {
  onSearch: (term: string) => void;
  onFilter: (filter: string) => void;
  activeFilter: string;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ onSearch, onFilter, activeFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-2">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilter(filter.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFilter === filter.key
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;
