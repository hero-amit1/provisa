import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token, user, logout } = useAuth();
  const location = useLocation();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (token) {
      fetch('/api/health', {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        logout();
        setIsValid(false);
      });
    }
  }, [token, logout]);

  if (!token || !user || user.role !== 'admin' || !isValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
