import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✂️</span>
          Tailor Management
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-order" className="navbar-link">Add Order</Link>
          </li>
          <li className="navbar-item">
            <Link to="/orders" className="navbar-link">Orders</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tailors" className="navbar-link">Tailors</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
