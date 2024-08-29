import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/spinner';
import PrivateRoute from '@/routes/PrivateRoute';
import { AddPromotionMain } from '@/pages/promotion/addpromotionmain';
import { AllPromotions } from '@/pages/promotion/allpromotions';

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

// Queue Related Pages
const ShopQueue = lazy(
  () => import('@/pages/queue/shop-queue'),
);

// Shop Related Pages
const Shop = lazy(() => import('@/pages/shop/shop'));

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
      {
        path: 'queue/:shopID',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ShopQueue />
          </Suspense>
        ),
      },
      {
        path: 'shops',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Shop />
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
      {
        path: 'addpromotion',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddPromotionMain />
          </Suspense>
        ),
      },
      {
        path: 'allpromotions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AllPromotions />
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
