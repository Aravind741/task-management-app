import React from 'react';
import { useSelector } from 'react-redux';

const FilterBar = () => {
  const { users, projects } = useSelector(state => state.tasks.entities);
  // Get current filter values to make the inputs "controlled"
  const filters = useSelector(state => state.tasks.ui.filters);

  return (
    <div className="row g-3 bg-white p-3 rounded shadow-sm align-items-end">
      <div className="col-md-3">
        <label className="form-label small fw-bold">Search</label>
        <input 
          name="search"
          className="form-control" 
          placeholder="Search tasks..." 
          value={filters.search} // Controlled component
        />
      </div>
      
      <div className="col-md-2">
        <label className="form-label small fw-bold">Project</label>
        <select name="project" className="form-select" value={filters.project} >
          <option value="">All Projects</option>
          {Object.values(projects.byId).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label small fw-bold">Status</label>
        <select name="status" className="form-select" value={filters.status}>
          <option value="all">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label small fw-bold">Type</label>
        <select name="taskType" className="form-select" value={filters.taskType}>
          <option value="all">All Types</option>
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Research">Research</option>
        </select>
      </div>

      {/* RESET BUTTON */}
      <div className="col-md-1">
        <button 
          type="button" 
          className="btn btn-outline-secondary w-100" 
          title="Reset Filters"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;