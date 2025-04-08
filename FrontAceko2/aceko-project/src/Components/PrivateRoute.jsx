import React, { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      if (!token || isTokenExpired(token)) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Chargement...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;