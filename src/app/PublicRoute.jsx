import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function PublicRoute({ children }) {
  const { isAuth } = useAuth();
  if (isAuth) return <Navigate to="/" replace />;
  return children;
}
