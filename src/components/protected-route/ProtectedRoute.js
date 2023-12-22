import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, children, redirectPath = '/login' }) => {
  return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
