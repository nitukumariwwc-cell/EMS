import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const url = selectedCategory 
        ? `http://localhost:5002/api/products?category=${selectedCategory}`
        : 'http://localhost:5002/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/cart');
      const count = response.data.items?.length || 0;
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5002/api/cart/add', {
        productId,
        quantity: 1
      });
      fetchCartCount();
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/user/dashboard" className="logo">E-Commerce Store</Link>
          <div className="nav-links">
            <Link to="/user/dashboard">Home</Link>
            <Link to="/user/cart">
              Cart ({cartCount})
            </Link>
            <Link to="/user/order-status">Orders</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || 'Customer'}</h1>
          <p>Browse our products</p>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
            style={{ maxWidth: '300px' }}
          >
            <option value="">All Categories</option>
            <option value="Catering">Catering</option>
            <option value="Florist">Florist</option>
            <option value="Decoration">Decoration</option>
            <option value="Lighting">Lighting</option>
          </select>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                {product.productImage ? (
                  <img src={product.productImage} alt={product.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="product-info">
                <div className="product-name">{product.productName}</div>
                <div className="product-price">₹{product.productPrice}</div>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <p>No products available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
