import React from "react";
import { FaSearch } from "react-icons/fa";
import TourRakshakLogo from "../../Assets/images/TourRakshakLogo.png"
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header">
        <div className="headerLogo">
          <img src={TourRakshakLogo} alt="TourRakshak" />
          <div className="headerText">
            <p>Police</p>
            <p>Department</p>
          </div>
        </div>
        <div className="headerOptions">
          <ul>
            <li>Something</li>
            <li>Something</li>
            <li>Something</li>
            <li>
              <div className="searchDiv">
                <span className="searchIcon">
                  <FaSearch />
                </span>
                <input className="searchInput" type="text" />
              </div>
            </li>
            <li>
              <div className="userDiv">
                <div className="userIcon">
                  <img src="" alt="" />
                </div>
                <div className="userDetails">
                  <p className="userName">Cops</p>
                  <ul className="userAction">
                    <li>Edit Profile</li>
                    <li>Signout</li>
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
