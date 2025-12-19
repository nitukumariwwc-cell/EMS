import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'Catering'
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = ['Catering', 'Florist', 'Decoration', 'Lighting'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = (formData.name || '').trim();
    const trimmedEmail = (formData.email || '').trim();
    const trimmedPassword = (formData.password || '').trim();
    const trimmedCategory = (formData.category || '').trim();

    // Validate required fields
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    if (!trimmedEmail) {
      setError('Email is required');
      return;
    }

    if (!trimmedPassword) {
      setError('Password is required');
      return;
    }

    if (userType === 'vendor' && !trimmedCategory) {
      setError('Category is required for vendors');
      return;
    }

    const signupData = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      role: userType
    };

    if (userType === 'vendor') {
      signupData.category = trimmedCategory;
    }

    const result = await signup(signupData);
    
    if (result.success) {
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (userType === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join us and get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="form-group">
            <label>I want to sign up as *</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-control"
              required
            >
              <option value="user">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          {userType === 'vendor' && (
            <div className="form-group">
              <label>Business Category *</label>
              <select
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Create Account
          </button>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
