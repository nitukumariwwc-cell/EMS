import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './AddNewItem.css';

const AddNewItem = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productImage: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (!formData.productName || !formData.productPrice) {
      setError('Product name and price are required');
      return;
    }

    try {
      await axios.post('http://localhost:5002/api/vendor/products', formData);
      setSuccess('Product added successfully');
      setFormData({ productName: '', productPrice: '', productImage: '' });
      setTimeout(() => {
        navigate('/vendor/dashboard');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding product');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="add-item-page">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/vendor/dashboard" className="logo">Vendor Dashboard</Link>
          <div className="nav-links">
            <Link to="/vendor/dashboard">My Products</Link>
            <Link to="/vendor/add-item">Add Product</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="form-container">
          <h1 style={{ marginBottom: '30px' }}>Add New Product</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Product Price (₹) *</label>
              <input
                type="number"
                name="productPrice"
                className="form-control"
                value={formData.productPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Product Image URL</label>
              <input
                type="url"
                name="productImage"
                className="form-control"
                value={formData.productImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Add Product
              </button>
              <Link to="/vendor/dashboard" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;
