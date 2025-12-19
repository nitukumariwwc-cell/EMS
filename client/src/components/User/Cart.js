import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put('http://localhost:5002/api/cart/update', {
        productId,
        quantity: newQuantity
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5002/api/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-page">
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
        <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>
        
        {cart.items && cart.items.length > 0 ? (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId?.productName || 'N/A'}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                          style={{ width: '60px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.productId._id)}
                          className="btn btn-secondary"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{cart.totalAmount}</span>
                </div>
                <div className="summary-row">
                  <span>Total:</span>
                  <span className="total-amount">₹{cart.totalAmount}</span>
                </div>
                <Link to="/user/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/user/dashboard" className="btn btn-primary">Continue Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
