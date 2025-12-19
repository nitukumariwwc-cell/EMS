import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalVendors: 0, totalMemberships: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/admin/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
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
          <h1>Admin Dashboard</h1>
          <p>Manage the system</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="value">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Total Vendors</h3>
            <div className="value">{stats.totalVendors}</div>
          </div>
          <div className="stat-card">
            <h3>Total Memberships</h3>
            <div className="value">{stats.totalMemberships}</div>
          </div>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <Link to="/admin/maintenance" className="btn btn-primary">
            Go to Maintenance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
