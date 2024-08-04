import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Static Pages
const Home = lazy(() => import('@/pages/home/home'));

// Auth Pages
const Login = lazy(() => import('@/pages/login/login'));

const Layout = lazy(() => import('@/layout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Layout />
      </Suspense>
    ),
    children: [],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
