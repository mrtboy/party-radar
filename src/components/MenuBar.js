import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => (
  <div className="menu-bar">
    <div className="content-container">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <a href="javascript:void(0)" className="dropbtn">Manage Events</a>
          <div className="dropdown-content">
            <Link to="/create">Add new Event</Link>
            <Link to="/eventList">View Events</Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default MenuBar;

