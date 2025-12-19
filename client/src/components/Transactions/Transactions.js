import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="transactions-page">
      <div className="page-nav">
        <Link to="/user/dashboard" className="btn btn-blue">Home</Link>
        <Link to="/transactions/add" className="btn btn-blue">Add Transaction</Link>
      </div>
      
      <div className="content-box">
        <h2>Transactions</h2>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction Number</th>
                <th>User</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction._id}>
                  <td>{transaction.orderNumber}</td>
                  <td>{transaction.userId?.name || 'N/A'}</td>
                  <td>Rs {transaction.totalAmount}/-</td>
                  <td>{transaction.status}</td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

