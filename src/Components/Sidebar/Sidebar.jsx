import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegBell, FaShieldAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <div className="listItem">
            <span className="itemLogo">
              <MdOutlineDashboard />
            </span>
            <span className="itemName">DashBoard</span>
          </div>
        </li>
        <li>
          <div className="listItem">
            <span className="itemLogo">
              <FaRegBell /> <span className="alertNumber">2</span>
            </span>
            <span className="itemName">Alerts</span>
          </div>
        </li>
        <li>
          <div className="listItem">
            <span className="itemLogo">
              <FaShieldAlt /> <span className="incidentNumber">2</span>
            </span>
            <span className="itemName">Incidents</span>
          </div>
        </li>
        <li>
          <div className="listItem">
            <span className="itemLogo">
              <CiSettings />
            </span>
            <span className="itemName">Settings</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
