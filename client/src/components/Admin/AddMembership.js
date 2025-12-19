import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './AddMembership.css';

const AddMembership = () => {
  const [formData, setFormData] = useState({
    membershipNumber: '',
    vendorId: '',
    membershipType: '6 months'
  });
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/maintenance/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.membershipNumber || !formData.vendorId || !formData.membershipType) {
      setError('All fields are mandatory');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/maintenance/add-membership', formData);
      setSuccess('Membership added successfully');
      setFormData({
        membershipNumber: '',
        vendorId: '',
        membershipType: '6 months'
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding membership');
    }
  };

  return (
    <div className="add-membership-page">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/admin/dashboard" className="logo">Admin Dashboard</Link>
          <div className="nav-links">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/maintenance">Maintenance</Link>
            <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="form-container">
          <h1 style={{ marginBottom: '30px' }}>Add Membership</h1>
        
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Membership Number *</label>
              <input
                type="text"
                name="membershipNumber"
                className="form-control"
                value={formData.membershipNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Vendor *</label>
              <select
                name="vendorId"
                className="form-control"
                value={formData.vendorId}
                onChange={handleChange}
                required
              >
                <option value="">Select Vendor</option>
                {vendors.map(vendor => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.userId} - {vendor.name} ({vendor.category})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Membership Type *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="membershipType"
                    value="6 months"
                    checked={formData.membershipType === '6 months'}
                    onChange={handleChange}
                  />
                  6 months
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="membershipType"
                    value="1 year"
                    checked={formData.membershipType === '1 year'}
                    onChange={handleChange}
                  />
                  1 year
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="membershipType"
                    value="2 years"
                    checked={formData.membershipType === '2 years'}
                    onChange={handleChange}
                  />
                  2 years
                </label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Membership</button>
              <Link to="/admin/maintenance" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMembership;

