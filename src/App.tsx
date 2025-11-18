// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;