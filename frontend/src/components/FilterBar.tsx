interface FilterBarProps {
    onFilterChange: (name: string, value: string) => void;
  }
  
  const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange(e.target.name, e.target.value);
    };
  
    return (
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <select
          name="status"
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="priority"
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by priority"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          name="dueDate"
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by due date"
        >
          <option value="">All Due Dates</option>
          <option value="today">Due Today</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    );
  };
  
  export default FilterBar;