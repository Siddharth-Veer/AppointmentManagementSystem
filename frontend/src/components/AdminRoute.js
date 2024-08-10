// src/components/AdminRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  return <Route {...rest} element={element} />;
};

export default AdminRoute;