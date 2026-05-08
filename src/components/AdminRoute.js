import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ user, children }) => {
  return user && user.role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRoute;
