import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './VendorProducts.css';

const VendorProducts = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/products/vendor/${vendorId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5002/api/cart/add', {
        productId,
        quantity: 1
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  return (
    <div className="vendor-products-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-green-border">Home</Link>
        <Link to="/user/vendors" className="btn btn-green-border">Back</Link>
        <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-green-border">LogOut</button>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.productName}</h3>
            <p>Price: Rs {product.productPrice}/-</p>
            <button 
              onClick={() => handleAddToCart(product._id)}
              className="btn btn-green-border"
            >
              Add to Cart
            </button>
          </div>
        ))}
        {products.length === 0 && (
          <div className="no-products">No products available</div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;

