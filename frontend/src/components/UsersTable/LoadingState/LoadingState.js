import React from 'react';
import './LoadingState.css';

/**
 * LoadingState component - displays loading spinner and message
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message
 * @param {string} props.title - Optional title to display
 */
const LoadingState = ({ message = "Loading users...", title = "Users" }) => {
  return (
    <div className="users-table-container">
      <div className="table-header">
        <div className="table-title-section">
          <h2 className="table-title">{title}</h2>
        </div>
      </div>
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
