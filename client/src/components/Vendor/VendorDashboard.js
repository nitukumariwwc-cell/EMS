import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/vendor/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5002/api/vendor/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="vendor-dashboard">
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
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || 'Vendor'}</h1>
          <p>Manage your products</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Link to="/vendor/add-item" className="btn btn-primary">
            + Add New Product
          </Link>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>₹{product.productPrice}</td>
                  <td>{product.category || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    No products yet. <Link to="/vendor/add-item">Add your first product</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
