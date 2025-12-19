import React from 'react';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
  return (
    <div className="update-user-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-green-border">Home</Link>
        <Link to="/admin/maintenance" className="btn btn-green-border">Back</Link>
      </div>
      <div className="content-box">
        <h2>Update User</h2>
        <p>User management functionality - To be implemented</p>
      </div>
    </div>
  );
};

export default UpdateUser;

