import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

const TaskList = () => {
  // 1. Grab tasks and current filter settings from Redux
  const tasksData = useSelector((state) => state.tasks?.entities?.tasks);
  const filters = useSelector((state) => state.tasks?.ui?.filters);

  if (!tasksData || !tasksData.allIds) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }

  // 2. Filter logic
  const filteredTaskIds = tasksData.allIds.filter((id) => {
    const task = tasksData.byId[id];

    // Search filter (Title)
    const matchesSearch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase());

    // Project filter (matches project ID)
    const matchesProject = !filters.project || 
      String(task.projectId) === String(filters.project);

    // Status filter
    const matchesStatus = filters.status === 'all' || 
      task.status === filters.status;

    // Task Type filter
    const matchesType = filters.taskType === 'all' || 
      task.taskType === filters.taskType;

    return matchesSearch && matchesProject && matchesStatus && matchesType;
  });

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {filteredTaskIds.length > 0 ? (
        filteredTaskIds.map((id) => (
          <div className="col" key={id}>
            <TaskCard task={tasksData.byId[id]} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <p className="text-muted">No tasks match the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;