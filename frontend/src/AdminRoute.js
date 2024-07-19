import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({ element, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // Optionally, you can add additional checks to verify the token's validity
    return !!token;
  };

  return isAuthenticated() ? <Route {...rest} element={element} /> : <Navigate to="/admin" />;
};

export default AdminRoute;
