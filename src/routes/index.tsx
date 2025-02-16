import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/Layout';
import { RouteObject } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: 'home', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
