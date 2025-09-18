import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <img src="/images/MCPX icon.svg" alt="MCPX" width="40" height="40" />
        </div>
        <div className="logo-text">
          <div className="mcpx-text">MCPX</div>
          <div className="lunar-text">by lunar.dev</div>
        </div>
      </div>
      <div className="chevron-icon">
        <img src="/images/CaretDown.svg" alt="Chevron" width="16" height="16" />
      </div>
      <div className="topbar-right">
        <div className="user-avatar">
          <img src="/images/image 39.png" alt="User Avatar" width="40" height="40" className="avatar-image" />
        </div>
      </div>
      <div className="topbar-border"></div>
    </div>
  );
};

export default Topbar;
