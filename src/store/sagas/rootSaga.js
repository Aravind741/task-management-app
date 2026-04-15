import { all, call, put, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../API/mockApi';
import { apiStart, fetchDataSuccess, rollbackCreate } from '../slices/taskSlice';

function* handleFetchData() {
  try {
    yield put(apiStart());
    // Loads the 2 initial tasks from the provided mock data
    const [tasks, users, projects] = yield all([
      call(mockApi.fetchTasks),
      call(mockApi.fetchUsers),
      call(mockApi.fetchProjects)
    ]);
    yield put(fetchDataSuccess({ 
      tasks: tasks.data, 
      users: users.data, 
      projects: projects.data 
    }));
  } catch (e) { console.error(e); }
}


export function* rootSaga() {
  yield takeLatest('FETCH_DATA_TRIGGER', handleFetchData);
  yield takeLatest('CREATE_TASK_TRIGGER', function* (action) {
    try {
      yield call(mockApi.createTask, action.payload);
    } catch (e) {
      yield put(rollbackCreate(action.payload.id));
    }
  });
}