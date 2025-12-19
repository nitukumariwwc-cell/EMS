import React from 'react';
import { Link } from 'react-router-dom';

const VendorManagement = () => {
  return (
    <div className="vendor-management-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-green-border">Home</Link>
        <Link to="/user/dashboard" className="btn btn-green-border">Back</Link>
      </div>
      <div className="content-box">
        <h2>Vendor Management</h2>
        <p>Vendor management functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default VendorManagement;

