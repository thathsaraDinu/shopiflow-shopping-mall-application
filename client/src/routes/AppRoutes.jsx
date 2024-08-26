import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/spinner';
import PrivateRoute from '@/routes/PrivateRoute';

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingSpinner className="w-32 h-32" />
  </div>
);

// dashboard pages
const DasshboardLayout = lazy(
  () => import('@/pages/dashboard/layout'),
);
const Inventory = lazy(
  () => import('@/pages/dashboard/inventory'),
);

// Static Pages
const Home = lazy(() => import('@/pages/home/home'));

// Auth Pages
const Register = lazy(
  () => import('@/pages/user/register'),
);
const Login = lazy(() => import('@/pages/user/login'));
const Profile = lazy(() => import('@/pages/user/profile'));

// layouts
const Layout = lazy(() => import('@/layout'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute element={<Profile />} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DasshboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'inventory',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Inventory />
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
