import React from "react";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header>
      <div className="header">
        <div className="headerLogo">
          <img src="" alt="TourRakshak" />
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
                <div className="userIcon"></div>
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
