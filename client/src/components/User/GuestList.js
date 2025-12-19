import React from 'react';
import { Link } from 'react-router-dom';

const GuestList = () => {
  return (
    <div className="guest-list-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/user/dashboard" className="btn btn-blue">Back</Link>
      </div>
      <div className="content-box">
        <h2>Guest List</h2>
        <p>Guest list functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default GuestList;

