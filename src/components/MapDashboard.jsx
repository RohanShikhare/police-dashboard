import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { FaMap, FaLayerGroup, FaThermometerHalf } from 'react-icons/fa';
import './MapDashboard.css';

const MapDashboard = ({ department = 'police' }) => {
  const [mapType, setMapType] = useState('heatmap');
  const [isExpanded, setIsExpanded] = useState(false);

  const mapTypes = [
    {
      id: 'heatmap',
      name: 'Heat Map',
      icon: <FaThermometerHalf />,
      description: 'Shows activity density across locations'
    },
    {
      id: 'cluster',
      name: 'Cluster Map',
      icon: <FaLayerGroup />,
      description: 'Groups nearby points for better visualization'
    }
  ];

  return (
    <div className="map-dashboard">
      <div className="map-controls">
        <div className="map-type-selector">
          {mapTypes.map((type) => (
            <button
              key={type.id}
              className={`map-type-btn ${mapType === type.id ? 'active' : ''}`}
              onClick={() => setMapType(type.id)}
              title={type.description}
            >
              {type.icon}
              <span>{type.name}</span>
            </button>
          ))}
        </div>
        
        <button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaMap />
          {isExpanded ? 'Minimize' : 'Expand Map'}
        </button>
      </div>

      <div className={`map-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <MapComponent department={department} mapType={mapType} />
      </div>

      <div className="map-insights">
        <h4>Real-time Insights</h4>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon tourist">
              <FaLayerGroup />
            </div>
            <div className="insight-info">
              <h5>Tourist Hotspots</h5>
              <p>Red Fort and India Gate show highest activity</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon incident">
              <FaThermometerHalf />
            </div>
            <div className="insight-info">
              <h5>Safety Monitoring</h5>
              <p>3 areas require increased surveillance</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon analytics">
              <FaMap />
            </div>
            <div className="insight-info">
              <h5>Pattern Analysis</h5>
              <p>Peak activity detected between 2-4 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;