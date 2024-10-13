import { Navigate } from 'react-router-dom';
import React from 'react';

class PrivateRouteProps {
  children: React.ReactElement | null = null;
  childrenWhenNotLogged: React.ReactElement | null = null;
}

function PrivateRoute({ children, childrenWhenNotLogged } : PrivateRouteProps) {
  const isAuthenticated = false;

  return isAuthenticated ? children : childrenWhenNotLogged || <Navigate to="/login" />;
}

export default PrivateRoute;
