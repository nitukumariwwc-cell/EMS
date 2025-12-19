import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
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

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('All fields are required');
      return;
    }

    const result = await signup({ 
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      role: 'user' 
    });
    
    if (result.success) {
      navigate('/user/dashboard');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Customer Sign Up</h1>
          <p>Create your account to start shopping</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="form-group">
            <label>Name *</label>
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
            <label>Email *</label>
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
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign Up
          </button>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
            <p style={{ marginTop: '10px' }}>
              Are you a vendor? <Link to="/signup/vendor">Sign up as Vendor</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;

