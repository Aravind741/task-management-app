import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

const TaskList = () => {
  // 1. Grab tasks and current filter settings from Redux
  const tasksData = useSelector((state) => state.tasks?.entities?.tasks);

  if (!tasksData || !tasksData.allIds) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }



  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {tasksData.length > 0 ? (
        tasksData.map((id) => (
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