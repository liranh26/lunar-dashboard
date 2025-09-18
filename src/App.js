import React from 'react';
import './App.css';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="app">
      <Topbar />
      <div className="app-content">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
