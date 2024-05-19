import { lazy, useEffect, useState } from 'react';
import axios from 'axios';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import Loader from '../ui-component/Loader';
import config from '../config';

const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const FileManager = Loadable(lazy(() => import('../views/pages/file')));
const Bin = Loadable(lazy(() => import('../views/pages/bin')));
const Shared = Loadable(lazy(() => import('../views/pages/shared')));
const FacultiesListPage = Loadable(lazy(() => import('../views/pages/faculty/index')));
const DepartmentsListPage = Loadable(lazy(() => import('../views/pages/department/index')));
const Study = Loadable(lazy(() => import('../views/pages/study/index')));
const Notices = Loadable(lazy(() => import('../views/pages/notice/index')));
const Activity = Loadable(lazy(() => import('../views/pages/activity/index')));
const Curriculum = Loadable(lazy(() => import('../views/pages/curriculum/index')));
const Others = Loadable(lazy(() => import('../views/pages/others/index')));

const PrivateRoute = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const axiosInstance = axios.create({
    withCredentials: true, // Include cookies in the request
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

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <PrivateRoute>
        <DashboardDefault />
      </PrivateRoute>
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <PrivateRoute>
            <UtilsTypography />
          </PrivateRoute>
        },
      ]
    },
    {
      path: 'icons',
      children: [
        // Add icon routes
      ]
    },
    {
      path: 'filemanager',
      element: <PrivateRoute>
        <FileManager />
      </PrivateRoute>
    },
    {
      path: 'bin',
      element: <PrivateRoute>
        <Bin />
      </PrivateRoute>
    },
    {
      path: 'shared',
      element: <PrivateRoute>
        <Shared />
      </PrivateRoute>
    },
    {
      path: 'faculties',
      element: <PrivateRoute>
        <FacultiesListPage />
      </PrivateRoute>
    },
    {
      path: 'departments',
      element: <PrivateRoute>
        <DepartmentsListPage />
      </PrivateRoute>
    },
    {
      path: 'study',
      element: <PrivateRoute>
        <Study />
      </PrivateRoute>
    },
    {
      path: 'notices',
      element: <PrivateRoute>
        <Notices />
      </PrivateRoute>
    },
    {
      path: 'activity',
      element: <PrivateRoute>
        <Activity />
      </PrivateRoute>
    },
    {
      path: 'curriculum',
      element: <PrivateRoute>
        <Curriculum />
      </PrivateRoute>
    },
    {
      path: 'others',
      element: <PrivateRoute>
        <Others />
      </PrivateRoute>
    },
  ]
};

export default MainRoutes;
