import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './UpdateMembership.css';

const UpdateMembership = () => {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [membership, setMembership] = useState(null);
  const [action, setAction] = useState('extend');
  const [extensionType, setExtensionType] = useState('6 months');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoadMembership = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!membershipNumber) {
      setError('Membership number is mandatory');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5002/api/maintenance/membership/${membershipNumber}`
      );
      setMembership(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Membership not found');
      setMembership(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!membershipNumber) {
      setError('Membership number is mandatory');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5002/api/maintenance/update-membership', {
        membershipNumber,
        action,
        extensionType
      });
      setSuccess('Membership updated successfully');
      setMembership(response.data.membership);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating membership');
    }
  };

  return (
    <div className="update-membership-page">
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
          <h1 style={{ marginBottom: '30px' }}>Update Membership</h1>
        
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleLoadMembership} className="load-form">
            <div className="form-group">
              <label>Membership Number *</label>
              <input
                type="text"
                className="form-control"
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Loading...' : 'Load Membership'}
            </button>
          </form>

          {membership && (
            <div className="membership-details" style={{ marginTop: '30px', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#111827' }}>Membership Details</h3>
              <div className="details-grid">
                <div><strong>Membership Number:</strong> {membership.membershipNumber}</div>
                <div><strong>Vendor:</strong> {membership.vendorId?.name || 'N/A'}</div>
                <div><strong>Category:</strong> {membership.vendorId?.category || 'N/A'}</div>
                <div><strong>Type:</strong> {membership.membershipType}</div>
                <div><strong>Start Date:</strong> {new Date(membership.startDate).toLocaleDateString()}</div>
                <div><strong>End Date:</strong> {new Date(membership.endDate).toLocaleDateString()}</div>
                <div><strong>Status:</strong> {membership.status}</div>
              </div>
            </div>
          )}

          {membership && (
            <form onSubmit={handleUpdate} className="update-form" style={{ marginTop: '30px' }}>
              <div className="form-group">
                <label>Action *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="action"
                      value="extend"
                      checked={action === 'extend'}
                      onChange={(e) => setAction(e.target.value)}
                    />
                    Extend Membership
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="action"
                      value="cancel"
                      checked={action === 'cancel'}
                      onChange={(e) => setAction(e.target.value)}
                    />
                    Cancel Membership
                  </label>
                </div>
              </div>

              {action === 'extend' && (
                <div className="form-group">
                  <label>Extension Type *</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="extensionType"
                        value="6 months"
                        checked={extensionType === '6 months'}
                        onChange={(e) => setExtensionType(e.target.value)}
                      />
                      6 months
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="extensionType"
                        value="1 year"
                        checked={extensionType === '1 year'}
                        onChange={(e) => setExtensionType(e.target.value)}
                      />
                      1 year
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="extensionType"
                        value="2 years"
                        checked={extensionType === '2 years'}
                        onChange={(e) => setExtensionType(e.target.value)}
                      />
                      2 years
                    </label>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Update Membership</button>
                <Link to="/admin/maintenance" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>Cancel</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateMembership;

