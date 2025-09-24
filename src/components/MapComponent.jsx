import React, { useRef, useEffect, useState } from 'react';
import './MapComponent.css';

// Mock data for tourist locations and incidents
const generateMockData = (type, count = 10) => {
  const baseLocations = [
    { name: 'Red Fort', lat: 28.6562, lng: 77.2410 },
    { name: 'India Gate', lat: 28.6129, lng: 77.2295 },
    { name: 'Lotus Temple', lat: 28.5535, lng: 77.2588 },
    { name: 'Connaught Place', lat: 28.6315, lng: 77.2167 },
    { name: 'Chandni Chowk', lat: 28.6506, lng: 77.2334 },
    { name: 'Humayun Tomb', lat: 28.5933, lng: 77.2507 },
    { name: 'Karol Bagh', lat: 28.6519, lng: 77.1909 },
    { name: 'Nehru Place', lat: 28.5494, lng: 77.2500 },
    { name: 'Akshardham', lat: 28.6127, lng: 77.2773 },
    { name: 'Rajouri Garden', lat: 28.6465, lng: 77.1203 }
  ];

  return baseLocations.slice(0, count).map((location, index) => ({
    id: index,
    name: location.name,
    lat: location.lat + (Math.random() - 0.5) * 0.01,
    lng: location.lng + (Math.random() - 0.5) * 0.01,
    magnitude: Math.random() * 10,
    type: type,
    timestamp: Date.now() - Math.random() * 86400000,
    details: type === 'tourist' 
      ? `Tourist Group ${index + 1}` 
      : `Incident #${index + 1}`
  }));
};

const MapComponent = ({ department = 'police', mapType = 'heatmap' }) => {
  const canvasRef = useRef(null);
  const [mapData, setMapData] = useState({
    tourists: [],
    incidents: []
  });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMapData({
      tourists: generateMockData('tourist', 15),
      incidents: generateMockData('incident', 8)
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current && mapData.tourists.length > 0) {
      drawMap();
    }
  }, [mapData, mapType]);

  const handleCanvasClick = (event) => {
    if (mapType === 'cluster') {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if click is near any point
      const allPoints = [...mapData.tourists, ...mapData.incidents];
      const clickedPoint = allPoints.find(point => {
        const pointX = (point.lng - 77.1) * rect.width * 8;
        const pointY = rect.height - (point.lat - 28.5) * rect.height * 8;
        const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
        return distance <= 10; // 10px radius for click detection
      });
      
      if (clickedPoint) {
        setSelectedPoint(clickedPoint);
        setMousePos({ x, y });
      } else {
        setSelectedPoint(null);
      }
    }
  };

  const drawMap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Draw Delhi map outline (simplified)
    drawDelhiOutline(ctx, rect.width, rect.height);
    
    if (mapType === 'heatmap') {
      drawHeatmap(ctx, [...mapData.tourists, ...mapData.incidents], rect.width, rect.height);
    } else {
      drawClusterMap(ctx, mapData.tourists, mapData.incidents, rect.width, rect.height);
    }
  };

  const drawDelhiOutline = (ctx, width, height) => {
    // Draw Delhi boundary
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    
    ctx.beginPath();
    ctx.roundRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9, 15);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw major roads/areas
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 1;
    
    // Horizontal lines (representing major roads)
    for (let i = 0.2; i <= 0.8; i += 0.15) {
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * i);
      ctx.lineTo(width * 0.9, height * i);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let i = 0.2; i <= 0.8; i += 0.15) {
      ctx.beginPath();
      ctx.moveTo(width * i, height * 0.1);
      ctx.lineTo(width * i, height * 0.9);
      ctx.stroke();
    }
    
    // Add landmark labels
    const landmarks = [
      { name: '🏛️ Red Fort', x: width * 0.5, y: height * 0.25 },
      { name: '🗼 India Gate', x: width * 0.65, y: height * 0.55 },
      { name: '🏢 CP', x: width * 0.4, y: height * 0.4 },
      { name: '🕌 Lotus Temple', x: width * 0.7, y: height * 0.75 }
    ];
    
    ctx.fillStyle = '#7f8c8d';
    ctx.font = 'bold 11px sans-serif';
    landmarks.forEach(landmark => {
      ctx.fillText(landmark.name, landmark.x, landmark.y);
    });
  };

  const drawHeatmap = (ctx, data, width, height) => {
    // Set blend mode for better heatmap effect
    ctx.globalCompositeOperation = 'multiply';
    
    data.forEach(point => {
      const x = (point.lng - 77.1) * width * 8;
      const y = height - (point.lat - 28.5) * height * 8;
      
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        const intensity = Math.max(0.1, point.magnitude / 10);
        const radius = 40 + (intensity * 20);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        // Different colors for different types
        if (point.type === 'incident') {
          gradient.addColorStop(0, `rgba(231, 76, 60, ${intensity * 0.9})`);
          gradient.addColorStop(0.3, `rgba(230, 126, 34, ${intensity * 0.6})`);
          gradient.addColorStop(0.7, `rgba(241, 196, 15, ${intensity * 0.3})`);
          gradient.addColorStop(1, `rgba(241, 196, 15, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(52, 152, 219, ${intensity * 0.8})`);
          gradient.addColorStop(0.3, `rgba(46, 204, 113, ${intensity * 0.5})`);
          gradient.addColorStop(0.7, `rgba(155, 89, 182, ${intensity * 0.3})`);
          gradient.addColorStop(1, `rgba(155, 89, 182, 0)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
  };

  const drawClusterMap = (ctx, tourists, incidents, width, height) => {
    // Draw connection lines between nearby points
    ctx.strokeStyle = 'rgba(189, 195, 199, 0.3)';
    ctx.lineWidth = 1;
    
    const allPoints = [...tourists, ...incidents];
    for (let i = 0; i < allPoints.length; i++) {
      const point1 = allPoints[i];
      const x1 = (point1.lng - 77.1) * width * 8;
      const y1 = height - (point1.lat - 28.5) * height * 8;
      
      for (let j = i + 1; j < allPoints.length; j++) {
        const point2 = allPoints[j];
        const x2 = (point2.lng - 77.1) * width * 8;
        const y2 = height - (point2.lat - 28.5) * height * 8;
        
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        if (distance < 80) { // Connect nearby points
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
    
    // Draw tourist points with pulsing effect
    tourists.forEach((point, index) => {
      const x = (point.lng - 77.1) * width * 8;
      const y = height - (point.lat - 28.5) * height * 8;
      
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, 'rgba(52, 152, 219, 0.6)');
        gradient.addColorStop(1, 'rgba(52, 152, 219, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        // Main circle
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // White border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot
        ctx.fillStyle = '#2980b9';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    // Draw incident points with alert styling
    incidents.forEach((point, index) => {
      const x = (point.lng - 77.1) * width * 8;
      const y = height - (point.lat - 28.5) * height * 8;
      
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        // Alert glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        gradient.addColorStop(0, 'rgba(231, 76, 60, 0.8)');
        gradient.addColorStop(1, 'rgba(231, 76, 60, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.fill();
        
        // Main circle
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // White border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Alert symbol (!)
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', x, y);
      }
    });
    
    // Reset text properties
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h3>
          {department === 'police' ? '🚔 Police Monitoring' : '🏛️ Tourism Analytics'} - 
          {mapType === 'heatmap' ? ' Heat Map' : ' Cluster Map'}
        </h3>
        <div className="map-legend">
          {mapType === 'cluster' ? (
            <div className="cluster-legend">
              <div className="legend-item">
                <div className="legend-color tourist"></div>
                <span>Tourists</span>
              </div>
              <div className="legend-item">
                <div className="legend-color incident"></div>
                <span>Incidents</span>
              </div>
            </div>
          ) : (
            <div className="heatmap-legend">
              <span>Low Activity</span>
              <div className="gradient"></div>
              <span>High Activity</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="map-canvas-container">
        <canvas
          ref={canvasRef}
          className="map-canvas"
          width="800"
          height="400"
          onClick={handleCanvasClick}
        />
        <div className="map-overlay">
          <div className="zoom-controls">
            <button className="zoom-btn">+</button>
            <button className="zoom-btn">-</button>
          </div>
        </div>
        
        {/* Tooltip for selected point */}
        {selectedPoint && (
          <div 
            className="point-tooltip"
            style={{
              position: 'absolute',
              left: mousePos.x + 10,
              top: mousePos.y - 10,
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              pointerEvents: 'none',
              zIndex: 20
            }}
          >
            <div><strong>{selectedPoint.name}</strong></div>
            <div>Type: {selectedPoint.type}</div>
            <div>Magnitude: {selectedPoint.magnitude.toFixed(1)}</div>
            <div>Details: {selectedPoint.details}</div>
          </div>
        )}
      </div>
      
      <div className="map-stats">
        <div className="stat">
          <strong>{mapData.tourists.length}</strong>
          <span>Tourist Groups</span>
        </div>
        <div className="stat">
          <strong>{mapData.incidents.length}</strong>
          <span>Incidents</span>
        </div>
        <div className="stat">
          <strong>{mapData.tourists.length + mapData.incidents.length}</strong>
          <span>Total Points</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;