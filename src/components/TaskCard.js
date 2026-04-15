import { useDispatch } from 'react-redux';
import { deleteTaskOptimistic, setEditingTask } from '../store/slices/taskSlice';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  // Border color logic based on Screenshot (1)
  const isBug = task.taskType === 'Bug';
  const borderColor = isBug ? '#dc3545' : '#f39c12';

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTaskOptimistic(task.id));
      dispatch({ type: 'DELETE_TASK_TRIGGER', payload: task.id });
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 border-start border-4 mb-3" 
         style={{ borderLeftColor: borderColor }}>
      <div className="card-body">

        <div className="action-buttons d-flex gap-2">
  {/* Edit Icon */}
  <button 
    className="btn btn-link p-0 text-primary shadow-none" 
    onClick={() => dispatch(setEditingTask(task.id))}
    title="Edit Task"
  >
    <i className="bi bi-pencil-square fs-5"></i>
  </button>

  {/* Delete Icon */}
  <button 
    className="btn btn-link p-0 text-danger shadow-none" 
    onClick={handleDelete}
    title="Delete Task"
  >
    <i className="bi bi-trash fs-5"></i>
  </button>
</div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={`badge ${isBug ? 'bg-danger' : 'bg-warning text-dark'}`}>
            {task.taskType}
          </span>
          <span className="text-primary small fw-bold">{task.status || 'Todo'}</span>
        </div>
  
        <h5 className="fw-bold">{task.title}</h5>
        
        {/* Fix: Ensure 'description' matches the register key in TaskForm */}
        {task.description && (
          <p className="text-muted small mb-2">{task.description}</p>
        )}

        {/* Fix: Show Severity and Steps for Bugs per Screenshot (3) */}
        {isBug && (
          <div className="bg-light p-2 rounded mb-2">
            <div className="small"><strong>Severity:</strong> <span className="text-danger">{task.severity || 'Medium'}</span></div>
            {task.steps && <div className="small text-truncate"><strong>Steps:</strong> {task.steps}</div>}
          </div>
        )}

        <div className="border-top pt-2 mt-2 d-flex justify-content-between align-items-center text-secondary small">
          <span>Assignee: {task.assigneeId || 'Unassigned'}</span>
          <span className="fw-bold">Priority: {task.priority}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;