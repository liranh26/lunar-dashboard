import React, { useState, useEffect } from 'react';
import './StatsWidgets.css';
import apiService from '../../services/apiService';

const StatsWidgets = () => {
  const [stats, setStats] = useState({
    connectedTools: 0,
    connectedServers: 0,
    activeAgents: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats data on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getStats();
        setStats(response);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics');
        // Set fallback values
        setStats({
          connectedTools: 0,
          connectedServers: 0,
          activeAgents: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const widgets = [
    {
      title: 'Connected Tools',
      value: loading ? '...' : stats.connectedTools.toString(),
      icon: <img src="/images/tool.svg" alt="Tool" width="16" height="16" />
    },
    {
      title: 'Connected MCP servers',
      value: loading ? '...' : stats.connectedServers.toString(),
      icon: <img src="/images/server icon.svg" alt="Server" width="16" height="16" />
    },
    {
      title: 'Active Agents',
      value: loading ? '...' : stats.activeAgents.toString(),
      icon: <img src="/images/Nav icon.svg" alt="Navigation" width="16" height="16" />
    }
  ];

  return (
    <div className="stats-widgets">
      {widgets.map((widget, index) => (
        <div key={index} className="widget-card">
          <div className="widget-header">
            <div className="widget-icon">{widget.icon}</div>
            <div className="widget-title">{widget.title}</div>
          </div>
          <div className="widget-content">
            <div className={`widget-value ${loading ? 'loading' : ''}`}>
              {widget.value}
            </div>
          </div>
        </div>
      ))}
      {error && (
        <div className="stats-error">
          <small style={{ color: '#EF4444' }}>{error}</small>
        </div>
      )}
    </div>
  );
};

export default StatsWidgets;

