import { Navigate } from 'react-router-dom';
import React from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';

type PrivateRouteProps = {
  children: React.ReactElement | null;
  childrenWhenNotLogged: React.ReactElement | null;
}

function PrivateRoute({ children, childrenWhenNotLogged } : PrivateRouteProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus ? children : childrenWhenNotLogged || <Navigate to="/login" />;
}

export default PrivateRoute;
