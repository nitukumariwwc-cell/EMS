import React from 'react';
import { Link } from 'react-router-dom';

const UserRequest = () => {
  return (
    <div className="user-request-page">
      <div className="page-nav">
        <Link to="/vendor/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/vendor/dashboard" className="btn btn-blue">Back</Link>
      </div>
      <div className="content-box">
        <h2>User Request</h2>
        <p>User request functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default UserRequest;

