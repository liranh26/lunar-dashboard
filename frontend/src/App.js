import React from 'react';
import './App.css';
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';

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

