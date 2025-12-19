import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './VendorList.css';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const categories = ['Catering', 'Florist', 'Decoration', 'Lighting'];

  useEffect(() => {
    fetchVendors();
  }, [selectedCategory]);

  const fetchVendors = async () => {
    try {
      const url = selectedCategory 
        ? `http://localhost:5002/api/products?category=${selectedCategory}`
        : 'http://localhost:5002/api/products';
      const response = await axios.get(url);
      
      // Get unique vendors from products
      const vendorMap = new Map();
      response.data.forEach(product => {
        if (product.vendorId && !vendorMap.has(product.vendorId._id)) {
          vendorMap.set(product.vendorId._id, product.vendorId);
        }
      });
      setVendors(Array.from(vendorMap.values()));
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <div className="vendor-list-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-green-border">Home</Link>
        <div className="category-selector">
          <select 
            className="input-field" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-green-border">LogOut</button>
      </div>
      
      <div className="vendor-grid">
        {vendors.map((vendor, index) => (
          <div key={vendor._id} className="vendor-card">
            <h3>Vendor {index + 1}</h3>
            <p>Contact Details</p>
            <Link 
              to={`/user/vendors/${vendor._id}/products`} 
              className="btn btn-green-border"
            >
              Shop Item
            </Link>
          </div>
        ))}
        {vendors.length === 0 && (
          <div className="no-vendors">No vendors found</div>
        )}
      </div>
    </div>
  );
};

export default VendorList;

