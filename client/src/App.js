import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import MaintenanceMenu from './components/Admin/MaintenanceMenu';
import AddMembership from './components/Admin/AddMembership';
import UpdateMembership from './components/Admin/UpdateMembership';
import Cart from './components/User/Cart';
import Checkout from './components/User/Checkout';
import OrderStatus from './components/User/OrderStatus';
import AddNewItem from './components/Vendor/AddNewItem';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/maintenance" element={<PrivateRoute role="admin"><MaintenanceMenu /></PrivateRoute>} />
          <Route path="/admin/maintenance/add-membership" element={<PrivateRoute role="admin"><AddMembership /></PrivateRoute>} />
          <Route path="/admin/maintenance/update-membership" element={<PrivateRoute role="admin"><UpdateMembership /></PrivateRoute>} />
          
          <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/user/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/user/order-status" element={<PrivateRoute><OrderStatus /></PrivateRoute>} />
          
          <Route path="/vendor/dashboard" element={<PrivateRoute role="vendor"><VendorDashboard /></PrivateRoute>} />
          <Route path="/vendor/add-item" element={<PrivateRoute role="vendor"><AddNewItem /></PrivateRoute>} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
