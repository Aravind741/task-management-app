import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {
    tasks: { byId: {}, allIds: [] },
    users: { byId: {}, allIds: [] },
    projects: { byId: {}, allIds: [] }
  },
  ui: {
  filters: {
    search: '',
    project: '',
    status: 'all',
    taskType: 'all'
  },
  editingTaskId: null
}
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    apiStart: (state) => { state.ui.loading = true; },
    fetchDataSuccess: (state, action) => {
      state.ui.loading = false;
      const { tasks, users, projects } = action.payload;
      // Normalize data into entities
      tasks.forEach(t => {
        state.entities.tasks.byId[t.id] = t;
        if (!state.entities.tasks.allIds.includes(t.id)) state.entities.tasks.allIds.push(t.id);
      });
      users?.forEach(u => { state.entities.users.byId[u.id] = u; });
      projects?.forEach(p => { state.entities.projects.byId[p.id] = p; });
    },
    addTaskOptimistic: (state, action) => {
      const task = action.payload;
      state.entities.tasks.byId[task.id] = task;
      state.entities.tasks.allIds.unshift(task.id);
    },
    rollbackCreate: (state, action) => {
      const id = action.payload;
      delete state.entities.tasks.byId[id];
      state.entities.tasks.allIds = state.entities.tasks.allIds.filter(tid => tid !== id);
    },
    setFilters: (state, action) => {
    state.ui.filters = { ...state.ui.filters, ...action.payload };
  },
  setEditingTask: (state, action) => {
    state.ui.editingTaskId = action.payload; // Pass ID to open form with data
  },
  
  updateTaskOptimistic: (state, action) => {
    const task = action.payload;
    state.entities.tasks.byId[task.id] = { ...state.entities.tasks.byId[task.id], ...task };
  },

  deleteTaskOptimistic: (state, action) => {
    const id = action.payload;
    delete state.entities.tasks.byId[id];
    state.entities.tasks.allIds = state.entities.tasks.allIds.filter(tid => tid !== id);
  },
  resetFilters: (state) => {
  state.ui.filters = {
    search: '',
    project: '',
    status: 'all',
    taskType: 'all'
  };
}
  }
});

export const { 
  apiStart, 
  fetchDataSuccess, 
  addTaskOptimistic, 
  rollbackCreate, 
  setFilters,
  setEditingTask,
  updateTaskOptimistic,
  deleteTaskOptimistic,
  resetFilters 
} = taskSlice.actions;
export default taskSlice.reducer;