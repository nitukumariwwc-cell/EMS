import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'Catering',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    phone: ''
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

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();
    const trimmedCategory = formData.category.trim();

    if (!trimmedPassword || !trimmedName || !trimmedEmail || !trimmedCategory) {
      setError('All required fields must be filled');
      return;
    }

    const result = await signup({
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      category: trimmedCategory,
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pinCode: formData.pinCode.trim(),
      phone: formData.phone.trim()
    });
    
    if (result.success) {
      navigate('/vendor/dashboard');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Vendor Sign Up</h1>
          <p>Create your vendor account</p>
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
              placeholder="Enter your name"
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
          
          <div className="form-group">
            <label>Category *</label>
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
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign Up
          </button>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
            <p style={{ marginTop: '10px' }}>
              Want to shop? <Link to="/signup/user">Sign up as Customer</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;

