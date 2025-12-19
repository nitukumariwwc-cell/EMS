import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './OrderStatus.css';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    const colors = {
      'Received': '#f59e0b',
      'Ready for Shipping': '#3b82f6',
      'Out For Delivery': '#8b5cf6',
      'Delivered': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div className="order-status-page">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/user/dashboard" className="logo">E-Commerce Store</Link>
          <div className="nav-links">
            <Link to="/user/dashboard">Home</Link>
            <Link to="/user/cart">Cart</Link>
            <Link to="/user/order-status">Orders</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>My Orders</h1>
        
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status), color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-body">
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Items:</strong> {order.items.length} item(s)</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-orders">
            <p>No orders yet</p>
            <Link to="/user/dashboard" className="btn btn-primary">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
