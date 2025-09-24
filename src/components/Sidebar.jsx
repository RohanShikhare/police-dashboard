import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegBell, FaShieldAlt, FaUsers, FaMapMarkedAlt, FaChartLine } from "react-icons/fa";
import { MdOutlineDashboard, MdSecurity, MdReportProblem } from "react-icons/md";
import { BiMapAlt } from "react-icons/bi";
import { RiAlarmWarningLine } from "react-icons/ri";
import "./Sidebar.css";

function Sidebar({ department = 'police', onMenuClick }) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    if (onMenuClick) {
      onMenuClick(itemName);
    }
  };

  const policeMenuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <MdOutlineDashboard />,
      notifications: null
    },
    {
      id: 'alerts',
      name: 'Emergency Alerts',
      icon: <FaRegBell />,
      notifications: 3
    },
    {
      id: 'incidents',
      name: 'Incidents',
      icon: <FaShieldAlt />,
      notifications: 2
    },
    {
      id: 'maps',
      name: 'Live Maps',
      icon: <FaMapMarkedAlt />,
      notifications: null
    },
    {
      id: 'tracking',
      name: 'Tourist Tracking',
      icon: <BiMapAlt />,
      notifications: null
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: <MdReportProblem />,
      notifications: null
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <FaChartLine />,
      notifications: null
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <CiSettings />,
      notifications: null
    }
  ];

  const tourismMenuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <MdOutlineDashboard />,
      notifications: null
    },
    {
      id: 'maps',
      name: 'Tourism Maps',
      icon: <FaMapMarkedAlt />,
      notifications: null
    },
    {
      id: 'tourists',
      name: 'Tourist Management',
      icon: <FaUsers />,
      notifications: null
    },
    {
      id: 'destinations',
      name: 'Destinations',
      icon: <BiMapAlt />,
      notifications: null
    },
    {
      id: 'safety',
      name: 'Safety Alerts',
      icon: <RiAlarmWarningLine />,
      notifications: 1
    },
    {
      id: 'analytics',
      name: 'Tourism Analytics',
      icon: <FaChartLine />,
      notifications: null
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: <MdReportProblem />,
      notifications: null
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <CiSettings />,
      notifications: null
    }
  ];

  const menuItems = department === 'police' ? policeMenuItems : tourismMenuItems;

  return (
    <div className={`sidebar ${department}-sidebar`}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <div 
              className={`listItem ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="itemLogo">
                {item.icon}
                {item.notifications && (
                  <span className="notificationBadge">
                    {item.notifications}
                  </span>
                )}
              </span>
              <span className="itemName">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;