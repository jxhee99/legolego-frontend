import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role, setRedirectPath } = useContext(AuthContext);
  const location = useLocation();

  console.log('ProtectedRoute - 현재 역할:', role); // 현재 역할을 콘솔에 출력

  if (!isAuthenticated) {
    setRedirectPath(location.pathname); // 현재 경로를 저장
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
