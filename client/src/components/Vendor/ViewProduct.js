import React from 'react';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
  return (
    <div className="view-product-page">
      <div className="page-nav">
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/vendor/dashboard" className="btn btn-blue">Back</Link>
      </div>
      <div className="content-box">
        <h2>View Product</h2>
        <p>View product functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default ViewProduct;

