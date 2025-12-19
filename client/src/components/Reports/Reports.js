import React from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <div className="reports-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/reports/memberships" className="btn btn-blue">Membership Report</Link>
        <Link to="/reports/transactions" className="btn btn-blue">Transaction Report</Link>
      </div>
      <div className="content-box">
        <h2>Reports</h2>
        <p>Select a report type from the navigation above</p>
      </div>
    </div>
  );
};

export default Reports;

