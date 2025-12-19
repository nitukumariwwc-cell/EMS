import React from 'react';
import { Link } from 'react-router-dom';

const ProductStatus = () => {
  return (
    <div className="product-status-page">
      <div className="page-nav">
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/vendor/dashboard" className="btn btn-blue">Back</Link>
      </div>
      <div className="content-box">
        <h2>Product Status</h2>
        <p>Product status functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default ProductStatus;

