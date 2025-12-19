import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './YourItems.css';

const YourItems = () => {
  const [products, setProducts] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <div className="your-items-page">
      <div className="page-nav">
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-blue">LogOut</button>
      </div>
      
      <div className="content-box">
        <h2>Your Items</h2>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="image-placeholder">Image</div>
                  </td>
                  <td>{product.productName}</td>
                  <td>Rs {product.productPrice}/-</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleDelete(product._id)} className="btn btn-blue">Delete</button>
                      <button className="btn btn-blue">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YourItems;

