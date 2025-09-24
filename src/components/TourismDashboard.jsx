import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const TourismDashboard = () => {
  const [userSession, setUserSession] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      navigate('/login');
      return;
    }

    const sessionData = JSON.parse(session);
    if (sessionData.department !== 'tourism') {
      navigate('/login');
      return;
    }

    setUserSession(sessionData);
  }, [navigate]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  if (!userSession) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Loading Tourism Dashboard...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userSession={userSession} department="tourism" />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar department="tourism" onMenuClick={handleMenuClick} />
        <DashboardContent department="tourism" activeSection={activeSection} />
      </div>
    </div>
  );
};

export default TourismDashboard;