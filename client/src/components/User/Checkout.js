import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    number: '',
    paymentMethod: 'Cash',
    state: '',
    pinCode: ''
  });
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
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

    if (!formData.name || !formData.email || !formData.address || !formData.city || 
        !formData.number || !formData.state || !formData.pinCode) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/orders/create', {
        ...formData,
        phone: formData.number
      });
      setOrderData(response.data.order);
      setOrderPlaced(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Error placing order');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (orderPlaced && orderData) {
    return (
      <div className="checkout-page">
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/user/dashboard" className="logo">E-Commerce Store</Link>
            <div className="nav-links">
              <Link to="/user/dashboard">Home</Link>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase</p>
            <div className="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
              <p><strong>Total Amount:</strong> ₹{orderData.totalAmount}</p>
              <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
            </div>
            <Link to="/user/dashboard" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/user/dashboard" className="logo">E-Commerce Store</Link>
          <div className="nav-links">
            <Link to="/user/dashboard">Home</Link>
            <Link to="/user/cart">Cart</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="form-container">
          <h1 style={{ marginBottom: '30px' }}>Checkout</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
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
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  className="form-control"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Pin Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  className="form-control"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
