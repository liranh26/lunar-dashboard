import React from 'react';
import './StatsWidgets.css';

const StatsWidgets = () => {
  const widgets = [
    {
      title: 'Connected Tools',
      value: '39',
      icon: <img src="/images/tool.svg" alt="Tool" width="16" height="16" />
    },
    {
      title: 'Connected MCP servers',
      value: '11',
      icon: <img src="/images/server icon.svg" alt="Server" width="16" height="16" />
    },
    {
      title: 'Active Agents',
      value: '2',
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
            <div className="widget-value">{widget.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsWidgets;

