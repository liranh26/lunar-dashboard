import React from 'react';
import './ErrorState.css';

/**
 * ErrorState component - displays error message and retry button
 * @param {Object} props - Component props
 * @param {string} props.message - Error message
 * @param {string} props.title - Optional title to display
 * @param {Function} props.onRetry - Retry callback function
 */
const ErrorState = ({ 
  message = "Failed to load users. Please try again.", 
  title = "Users",
  onRetry 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="users-table-container">
      <div className="table-header">
        <div className="table-title-section">
          <h2 className="table-title">{title}</h2>
        </div>
      </div>
      <div className="error-state">
        <p className="error-message">{message}</p>
        <button 
          className="retry-button"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
