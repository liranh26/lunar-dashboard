import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <div className="logo-icon">M</div>
        </div>
        <div className="logo-text">
          <div className="mcpx-text">MCPX</div>
          <div className="lunar-text">by lunar.dev</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="notification-icon">🔔</div>
        <div className="user-avatar">
          <div className="avatar-circle"></div>
        </div>
      </div>
      <div className="topbar-border"></div>
    </div>
  );
};

export default Topbar;
