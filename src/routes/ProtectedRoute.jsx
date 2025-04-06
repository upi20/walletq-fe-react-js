import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
