import React from 'react';
import { Link } from 'react-router-dom';

const RequestItem = () => {
  return (
    <div className="request-item-page">
      <div className="page-nav">
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/vendor/dashboard" className="btn btn-blue">Back</Link>
      </div>
      <div className="content-box">
        <h2>Request Item</h2>
        <p>Request item functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default RequestItem;

