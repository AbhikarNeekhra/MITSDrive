import { lazy, useEffect, useState } from 'react';
import axios from 'axios';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import { Navigate } from 'react-router-dom';
import Loader from '../ui-component/Loader';
import config from '../config';

const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register')));
const AuthForgot = Loadable(lazy(() => import('../views/pages/authentication/authentication3/ForgotPassword')));
const AuthOtp = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Otp_verify')));

const AuthRoute = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/checklogin');
        setIsUserLoggedIn(res.data.loggedIn);
      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  if (isUserLoggedIn === null) {
    return <Loader />;
  }

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthRoute>
        <AuthLogin />
      </AuthRoute>
    },
    {
      path: '/register',
      element: <AuthRoute>
        <AuthRegister />
      </AuthRoute>
    },
    {
      path: '/',
      element: <AuthRoute>
        <AuthLogin />
      </AuthRoute>
    },
    {
      path: '*',
      element: <AuthRoute>
        <AuthLogin />
      </AuthRoute>
    },
    {
      path: '/forgotpassword',
      element: <AuthRoute>
        <AuthForgot />
      </AuthRoute>
    },
    {
      path: '/verifyotp',
      element: <AuthRoute>
        <AuthOtp />
      </AuthRoute>
    }
  ]
};

export default AuthenticationRoutes;