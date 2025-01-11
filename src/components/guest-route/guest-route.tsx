import { Navigate } from 'react-router-dom';
import React from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';
import AppRoutes from '../../constants/routes.ts';

type GuestRouteProps = {
  children: React.ReactElement | null;
}

function GuestRoute({children} : GuestRouteProps) {
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

  return !authorizationStatus ? children : <Navigate to={AppRoutes.Main} />;
}

export default GuestRoute;
