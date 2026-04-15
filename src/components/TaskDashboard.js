import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import TaskForm from '../components/TaskForm'; // Fixed typo in import path

const TaskDashboard = () => {
  const dispatch = useDispatch();
  
  // 1. Local state for manual "Create" button
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // 2. Redux state to detect if an "Edit" was triggered from a card
  const editingTaskId = useSelector(state => state.tasks.ui.editingTaskId);
  const taskCount = useSelector(state => state.tasks.entities.tasks.allIds.length);

  // 3. Logic: Show modal if either "Create" is clicked OR an "Edit ID" exists
  const isModalVisible = isCreateOpen || !!editingTaskId;

  useEffect(() => {
    // Triggers the Saga to fetch initial data from mockApi
    dispatch({ type: 'FETCH_DATA_TRIGGER' });
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsCreateOpen(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Task Management Dashboard</h2>
        <button 
          className="btn btn-primary px-4 fw-bold shadow-sm" 
          onClick={() => setIsCreateOpen(true)}
        >
          + Create Task
        </button>
      </div>

      {/* Filter bar with dropdowns matching your UI */}
      <FilterBar />

      <h4 className="mt-4 mb-3 fw-bold text-secondary">
        Tasks ({taskCount})
      </h4>
      
      <TaskList />

      {/* Modal logic for Create and Edit */}
      {isModalVisible && (
        <TaskForm onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TaskDashboard;