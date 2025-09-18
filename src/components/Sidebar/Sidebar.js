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
              <img src="/images/UserCircle.svg" alt="Users" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Users</span>
            </div>
            <div className="menu-item">
              <img src="/images/FolderUser.svg" alt="Profiles" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Profiles</span>
            </div>
          </div>
        </div>
        
        <div className="management-section">
          <div className="section-header">
            <span className="section-title">MANAGEMENT</span>
            <span className="coming-soon-badge">
              <span>Coming Soon</span>
            </span>
          </div>
          <div className="menu-items">
            <div className="menu-item disabled">
              <img src="/images/Gauge.svg" alt="Dashboard" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </div>
            <div className="menu-item disabled">
              <img src="/images/Bell.svg" alt="Pending Requests" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Pending Requests</span>
            </div>
            <div className="menu-item disabled">
              <img src="/images/Users.svg" alt="Agent Profiles" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Agent Profiles</span>
            </div>
            <div className="menu-item disabled">
              <img src="/images/Sliders.svg" alt="Tool Customization" width="16" height="16" className="menu-icon" />
              <span className="menu-text">Tool Customization</span>
            </div>
            <div className="menu-item disabled">
              <img src="/images/PlugsConnected.svg" alt="System Integrations" width="16" height="16" className="menu-icon" />
              <span className="menu-text">System Integrations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
