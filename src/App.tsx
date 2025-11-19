// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ActivityTracker from './components/ActivityTracker';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ActivityTracker />
        <Header />
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;