import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskOptimistic } from '../store/slices/taskSlice';

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { users, projects } = useSelector(state => state.tasks.entities);
  
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: { taskType: 'Bug', priority: 'Medium', subtasks: [] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "subtasks" });
  const taskType = watch("taskType");

  const onSubmit = (data) => {
    const tempId = Date.now();
    const newTask = { ...data, id: tempId, status: 'Todo' };
    dispatch(addTaskOptimistic(newTask));
    dispatch({ type: 'CREATE_TASK_TRIGGER', payload: newTask });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="fw-bold m-0">Create New Task</h5>
          <button onClick={onClose} className="btn-close"></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="mb-3">
            <label>Title *</label>
            <input {...register("title", { required: true })} className="form-control form-dark-control" placeholder="Enter task title..." />
          </div>

          <div className="mb-3">
            <label>Task Type *</label>
            <select {...register("taskType")} className="form-select form-dark-control">
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Priority *</label>
            <select {...register("priority")} className="form-select form-dark-control">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Project</label>
            <select {...register("projectId")} className="form-select form-dark-control">
              <option value="">Select a project...</option>
              {Object.values(projects.byId).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label>Assignee</label>
            <select {...register("assigneeId")} className="form-select form-dark-control">
              <option value="">Unassigned</option>
              {Object.values(users.byId).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea {...register("description")} className="form-control form-dark-control" rows="3" placeholder="Enter task description..." />
          </div>

          <div className="mb-3">
            <label>Due Date</label>
            <input type="date" {...register("dueDate")} className="form-control form-dark-control" />
          </div>

          {/* Dynamic Fields */}
          {taskType === 'Bug' && (
            <>
              <div className="mb-3">
                <label>Severity *</label>
                <select {...register("severity")} className="form-select form-dark-control">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Steps to Reproduce</label>
                <textarea {...register("steps")} className="form-control form-dark-control" placeholder="1. Step one..." />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="d-block mb-2">Subtasks</label>
            <button type="button" onClick={() => append({ title: '' })} className="btn btn-dark btn-sm mb-2">Add Subtask</button>
            {fields.map((item, index) => (
              <div key={item.id} className="d-flex mb-2">
                <input {...register(`subtasks.${index}.title`)} className="form-control form-dark-control me-2" />
                <button type="button" onClick={() => remove(index)} className="btn btn-danger">✕</button>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;