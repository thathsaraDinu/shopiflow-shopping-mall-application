import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/spinner';

// Static Pages
const Home = lazy(() => import('@/pages/home/home'));

// Auth Pages
const Login = lazy(() => import('@/pages/login/login'));
const Signup = lazy(() => import('@/pages/signup/signup'));

const Layout = lazy(() => import('@/layout'));

const router = createBrowserRouter([
  {
    path: 'login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
