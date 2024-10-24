import { Navigate } from 'react-router-dom';
import React from 'react';

type PrivateRouteProps = {
  children: React.ReactElement | null;
  childrenWhenNotLogged: React.ReactElement | null;
}

function PrivateRoute({ children, childrenWhenNotLogged } : PrivateRouteProps) {
  const isAuthenticated = true;

  return isAuthenticated ? children : childrenWhenNotLogged || <Navigate to="/login" />;
}

export default PrivateRoute;
