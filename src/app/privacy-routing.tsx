import { Navigate, Outlet } from 'react-router-dom';

import { PATHS, PrivacyREASONS } from '../constants/path-routing';
import { PrivateRouteProps } from '../types/privacy-type';

export const PrivateRoute = ({ isAvailable, privacyReason }: PrivateRouteProps) => {
  if (privacyReason === PrivacyREASONS.notForUser && !isAvailable) {
    return <Navigate to={PATHS.main} />;
  }
  if (privacyReason === PrivacyREASONS.userOnly && !isAvailable) {
    return <Navigate to={PATHS.auth} />;
  }

  return <Outlet />;
};