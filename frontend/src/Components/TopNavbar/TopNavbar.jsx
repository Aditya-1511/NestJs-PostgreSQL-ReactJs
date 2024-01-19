import React from 'react';
import './topNavbar.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function TopNavbar() {
  return (
    <div className="topNavbar">
      <div className="navbar">
        <div className="nav-items">
          <ul type="none" className="nav-links">
            <li>
              <Link to="/">
                <Button variant="info" type="submit">
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <Button variant="info" type="submit">
                  About Us
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/services">
                <Button variant="info" type="submit">
                  Services
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <Button variant="info" type="submit">
                  Profile
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/">
                <Button variant="danger" type="submit">
                  Logout
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
