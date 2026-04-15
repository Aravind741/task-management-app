import { Provider } from 'react-redux';
import { store } from './store';
import TaskDashboard from '../src/components/TaskDashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App bg-slate-50 min-h-screen">
        <TaskDashboard />
      </div>
    </Provider>
  );
}

export default App;