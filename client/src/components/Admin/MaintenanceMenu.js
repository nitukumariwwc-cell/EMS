import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './MaintenanceMenu.css';

const MaintenanceMenu = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="maintenance-menu-page">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/admin/dashboard" className="logo">Admin Dashboard</Link>
          <div className="nav-links">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/maintenance">Maintenance</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-header">
          <h1>Maintenance</h1>
          <p>Manage memberships</p>
        </div>

        <div className="maintenance-options">
          <Link to="/admin/maintenance/add-membership" className="maintenance-card">
            <h3>Add Membership</h3>
            <p>Create a new membership for vendors</p>
          </Link>
          <Link to="/admin/maintenance/update-membership" className="maintenance-card">
            <h3>Update Membership</h3>
            <p>Extend or cancel existing memberships</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMenu;
