import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from '@/routes/PrivateRoute';
import RootRoute from '@/routes/RootRoute';
import { LoadingSpinner } from '@/components/ui/spinner';
import { USER_ROLES } from '@/constants';

import { AddPromotionMain } from '@/pages/promotion/addpromotionmain';
import ItemDetails from '@/pages/dashboard/itemDetails';
import { AllPromotions } from '@/pages/promotion/allpromotions';
import Products from '@/pages/products/products';
import { ShowPromotions } from '@/pages/promotion/show-promotions';
import { PromotionDetails } from '@/pages/promotion/promotion-details';
import Wishlist from '@/pages/wishlist/wishlist';

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingSpinner className="w-32 h-32" />
  </div>
);

// Inventory Related Pages
const Inventory = lazy(
  () => import('@/pages/dashboard/inventory'),
);

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
const MyQueue = lazy(
  () => import('@/pages/queue/my-queue'),
);

// Shop Related Pages
const Shop = lazy(() => import('@/pages/shop/shop'));
const AdminShop = lazy(
  () => import('@/pages/shop/shopAdmin'),
);
const AddShop = lazy(() => import('@/pages/shop/addShop'));
const UpdateShop = lazy(
  () => import('@/pages/shop/updateShop'),
);

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
            <RootRoute />
          </Suspense>
        ),
      },

      // Auth Routes
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
            <PrivateRoute
              element={<Profile />}
              roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
            />
          </Suspense>
        ),
      },

      // Queue Routes
      {
        path: 'queue/:shopID',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ShopQueue />
          </Suspense>
        ),
      },
      {
        path: 'myqueue',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute
              element={<MyQueue />}
              roles={[USER_ROLES.USER]}
            />
          </Suspense>
        ),
      },

      // Shop Routes
      {
        path: 'shops',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: 'shopsadmin',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminShop />
          </Suspense>
        ),
      },
      {
        path: 'addshop',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddShop />
          </Suspense>
        ),
      },
      {
        path: 'updateshop/:shopId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UpdateShop />
          </Suspense>
        ),
      },

      // Promotion Routes
      {
        path: 'promotions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ShowPromotions />
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
      {
        path: 'promotiondetails/:type/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PromotionDetails />
          </Suspense>
        ),
      },

      // Products Routes
      {
        path: 'products',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
      },

      // Inventory Routes
      {
        path: 'inventory',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: 'inventory/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ItemDetails />
          </Suspense>
        ),
      },

      // Wishlist Routes
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Wishlist />
          </Suspense>
        ),
      },
    ],
  },

  // 404 Not Found Route
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
