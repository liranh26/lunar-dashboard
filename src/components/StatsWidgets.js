import React from 'react';
import './StatsWidgets.css';

const StatsWidgets = () => {
  const widgets = [
    {
      title: 'Connected Tools',
      value: '39',
      icon: '🔧'
    },
    {
      title: 'Connected MCP servers',
      value: '11',
      icon: '🖥️'
    },
    {
      title: 'Active Agents',
      value: '2',
      icon: '😊'
    }
  ];

  return (
    <div className="stats-widgets">
      {widgets.map((widget, index) => (
        <div key={index} className="widget-card">
          <div className="widget-icon">{widget.icon}</div>
          <div className="widget-content">
            <div className="widget-title">{widget.title}</div>
            <div className="widget-value">{widget.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsWidgets;
