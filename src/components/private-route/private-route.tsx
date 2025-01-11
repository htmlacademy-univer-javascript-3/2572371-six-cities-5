import { Navigate } from 'react-router-dom';
import React from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';
import AppRoutes from '../../constants/routes.ts';

type PrivateRouteProps = {
  children: React.ReactElement | null;
  childrenWhenNotLogged: React.ReactElement | null;
}

function PrivateRoute({ children, childrenWhenNotLogged } : PrivateRouteProps) {
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

  return authorizationStatus ? children : childrenWhenNotLogged || <Navigate to={AppRoutes.Login} />;
}

export default PrivateRoute;
