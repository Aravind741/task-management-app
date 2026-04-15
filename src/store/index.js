import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // This key MUST match the selector in TaskList
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);