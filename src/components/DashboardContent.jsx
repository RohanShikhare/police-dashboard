import React, { useState } from 'react';
import { FaMapMarkedAlt, FaUsers, FaChartLine, FaShieldAlt, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { MdLocationOn, MdSecurity, MdNotifications } from 'react-icons/md';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import MapDashboard from './MapDashboard';
import './DashboardContent.css';

const DashboardContent = ({ department = 'police', activeSection = 'dashboard' }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  const policeData = {
    stats: [
      { title: 'Active Tourists', value: '1,247', change: '+12%', icon: <FaUsers />, color: '#3498db' },
      { title: 'Emergency Alerts', value: '3', change: '+2', icon: <FaExclamationTriangle />, color: '#e74c3c' },
      { title: 'Incidents Resolved', value: '15', change: '+5', icon: <FaShieldAlt />, color: '#27ae60' },
      { title: 'Response Time', value: '4.2 min', change: '-1.2 min', icon: <FaClock />, color: '#f39c12' }
    ],
    alerts: [
      { id: 1, type: 'Emergency', message: 'Tourist reported missing at Red Fort area', time: '2 min ago', priority: 'high' },
      { id: 2, type: 'Safety', message: 'Suspicious activity detected near India Gate', time: '15 min ago', priority: 'medium' },
      { id: 3, type: 'Incident', message: 'Medical emergency assistance provided', time: '1 hour ago', priority: 'resolved' }
    ],
    recentIncidents: [
      { id: 1, title: 'Tourist Assistance', location: 'Connaught Place', status: 'Resolved', time: '10:30 AM' },
      { id: 2, title: 'Lost Tourist', location: 'Karol Bagh', status: 'In Progress', time: '11:45 AM' },
      { id: 3, title: 'Medical Emergency', location: 'Chandni Chowk', status: 'Resolved', time: '09:15 AM' }
    ]
  };

  const tourismData = {
    stats: [
      { title: 'Total Visitors', value: '2,847', change: '+18%', icon: <FaUsers />, color: '#00b894' },
      { title: 'Active Destinations', value: '28', change: '+3', icon: <FaMapMarkedAlt />, color: '#0984e3' },
      { title: 'Safety Alerts', value: '1', change: '-2', icon: <MdNotifications />, color: '#fdcb6e' },
      { title: 'Satisfaction Rate', value: '94.8%', change: '+2.1%', icon: <FaChartLine />, color: '#6c5ce7' }
    ],
    alerts: [
      { id: 1, type: 'Safety', message: 'Weather advisory for mountain regions', time: '30 min ago', priority: 'medium' },
      { id: 2, type: 'Update', message: 'New safety protocols implemented', time: '2 hours ago', priority: 'low' },
      { id: 3, type: 'Advisory', message: 'Peak season crowd management active', time: '4 hours ago', priority: 'medium' }
    ],
    destinations: [
      { name: 'Red Fort', visitors: '342', status: 'Normal', safety: 'Safe' },
      { name: 'India Gate', visitors: '567', status: 'Crowded', safety: 'Safe' },
      { name: 'Lotus Temple', visitors: '234', status: 'Normal', safety: 'Safe' }
    ]
  };

  const currentData = department === 'police' ? policeData : tourismData;

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>{department === 'police' ? 'Police Command Center' : 'Tourism Control Panel'}</h2>
        <div className="time-selector">
          <select value={selectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value)}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {currentData.stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change.startsWith('+') ? <BiTrendingUp /> : <BiTrendingDown />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="alerts-panel">
          <h3>Recent Alerts</h3>
          <div className="alerts-list">
            {currentData.alerts.map(alert => (
              <div key={alert.id} className={`alert-item priority-${alert.priority}`}>
                <div className="alert-content">
                  <span className="alert-type">{alert.type}</span>
                  <p>{alert.message}</p>
                  <small>{alert.time}</small>
                </div>
                <div className={`alert-indicator priority-${alert.priority}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-panel">
          <h3>{department === 'police' ? 'Recent Incidents' : 'Top Destinations'}</h3>
          {department === 'police' ? (
            <div className="incidents-list">
              {currentData.recentIncidents.map(incident => (
                <div key={incident.id} className="incident-item">
                  <div className="incident-info">
                    <h4>{incident.title}</h4>
                    <p><MdLocationOn /> {incident.location}</p>
                    <small>{incident.time}</small>
                  </div>
                  <span className={`incident-status status-${incident.status.toLowerCase().replace(' ', '-')}`}>
                    {incident.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="destinations-list">
              {currentData.destinations.map((dest, index) => (
                <div key={index} className="destination-item">
                  <div className="destination-info">
                    <h4>{dest.name}</h4>
                    <p>{dest.visitors} visitors today</p>
                  </div>
                  <div className="destination-status">
                    <span className={`status-badge ${dest.status.toLowerCase()}`}>{dest.status}</span>
                    <span className="safety-badge">{dest.safety}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MapDashboard department={department} />
    </div>
  );

  const renderAlerts = () => (
    <div className="alerts-content">
      <h2>Emergency Alerts & Notifications</h2>
      <div className="alerts-expanded">
        {currentData.alerts.map(alert => (
          <div key={alert.id} className={`alert-card priority-${alert.priority}`}>
            <div className="alert-header">
              <span className="alert-type-badge">{alert.type}</span>
              <span className="alert-time">{alert.time}</span>
            </div>
            <div className="alert-message">{alert.message}</div>
            <div className="alert-actions">
              <button className="btn-acknowledge">Acknowledge</button>
              <button className="btn-respond">Respond</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaps = () => (
    <div className="maps-content">
      <h2>{department === 'police' ? '🚔 Police Live Maps' : '🏛️ Tourism Maps'}</h2>
      <p>Interactive heatmaps and cluster maps for real-time monitoring</p>
      <MapDashboard department={department} />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'alerts':
        return renderAlerts();
      case 'maps':
        return renderMaps();
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  return <div className="main-content">{renderContent()}</div>;
};

export default DashboardContent;