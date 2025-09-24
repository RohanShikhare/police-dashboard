import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ userSession, department = 'police' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  const departmentConfig = {
    police: {
      title: 'Police Department',
      emoji: '🚔',
      color: '#0984e3'
    },
    tourism: {
      title: 'Tourism Department',
      emoji: '🏛️',
      color: '#00b894'
    }
  };

  const config = departmentConfig[department] || departmentConfig.police;

  return (
    <header>
      <div className="header" style={{ backgroundColor: config.color }}>
        <div className="headerLogo">
          <div className="logo-icon" style={{ backgroundColor: config.color }}>
            {config.emoji}
          </div>
          <div className="headerText">
            <p>Smart Tourism Safety</p>
            <p>{config.title}</p>
          </div>
        </div>
        <div className="headerOptions">
          <ul>
            <li>Dashboard</li>
            <li>Analytics</li>
            <li>Reports</li>
            <li>
              <div className="searchDiv">
                <span className="searchIcon">
                  <FaSearch />
                </span>
                <input 
                  className="searchInput" 
                  type="text" 
                  placeholder="Search..." 
                />
              </div>
            </li>
            <li>
              <div className="userDiv">
                <div className="userIcon">
                  <FaUser style={{ fontSize: '2.5rem', color: 'white' }} />
                </div>
                <div className="userDetails">
                  <p className="userName">
                    {userSession?.userInfo?.name || 'User'}
                  </p>
                  <ul className="userAction">
                    <li>Edit Profile</li>
                    <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      Sign Out
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;