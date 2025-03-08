import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated, loadUserData } from './authService';
import { Roles } from './constants';

// Component to protect routes based on authentication and role
const ProtectedRoute = ({ allowedRoles }) => {
  const currentRole = useSelector(state => state.role);
  const isLoggedIn = isAuthenticated();
  
  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // If no specific roles are required or user has allowed role, render the route
  if (!allowedRoles || allowedRoles.includes(currentRole)) {
    return <Outlet />;
  }
  
  // If user doesn't have the required role, redirect to unauthorized page
  // You could create a dedicated unauthorized page instead
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;