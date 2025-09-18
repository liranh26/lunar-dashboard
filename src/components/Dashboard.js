import React from 'react';
import './Dashboard.css';
import StatsWidgets from './StatsWidgets';
import UsersTable from './UsersTable';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>
      
      <div className="dashboard-widgets">
        <StatsWidgets />
      </div>
      
      <div className="dashboard-table">
        <UsersTable />
      </div>
    </div>
  );
};

export default Dashboard;
