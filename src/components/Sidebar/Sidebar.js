import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="ai-section">
          <div className="section-title">AI</div>
          <div className="menu-items">
            <div className="menu-item">
              <span className="menu-icon">@</span>
              <span className="menu-text">Users</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">📄</span>
              <span className="menu-text">Profiles</span>
            </div>
          </div>
        </div>
        
        <div className="management-section">
          <div className="section-header">
            <span className="section-title">MANAGEMENT</span>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
          <div className="menu-items">
            <div className="menu-item active">
              <span className="menu-icon">📊</span>
              <span className="menu-text">Dashboard</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🔔</span>
              <span className="menu-text">Pending Requests</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">👤</span>
              <span className="menu-text">Agent Profiles</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🔧</span>
              <span className="menu-text">Tool Customization</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">⭐</span>
              <span className="menu-text">System Integrations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
