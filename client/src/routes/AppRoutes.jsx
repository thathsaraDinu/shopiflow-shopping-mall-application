import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import RootRoute from '@/routes/RootRoute';
import { USER_ROLES } from '@/constants';

const LoadingSpinner = lazy(() =>
  import('@/components/ui/spinner').then((module) => ({
    default: module.LoadingSpinner,
  })),
);

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingSpinner className="w-32 h-32" />
  </div>
);

// Private Route
const PrivateRoute = lazy(
  () => import('@/routes/PrivateRoute'),
);

//Product Pages
const ItemDetails = lazy(
  () => import('@/pages/dashboard/itemDetails'),
);
const Products = lazy(
  () => import('@/pages/products/products'),
);
const Wishlist = lazy(
  () => import('@/pages/wishlist/wishlist'),
);

// Promotion Pages
const AllPromotions = lazy(
  () => import('@/pages/promotion/allpromotions'),
);
const ShowPromotions = lazy(
  () => import('@/pages/promotion/show-promotions'),
);
const PromotionDetails = lazy(
  () => import('@/pages/promotion/promotion-details'),
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
const ManageQueue = lazy(
  () => import('@/pages/queue/index'),
);
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
            <PrivateRoute
              element={<Register />}
              roles={[]}
            />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute element={<Login />} roles={[]} />
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
        path: 'queue',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute
              element={<ManageQueue />}
              roles={[USER_ROLES.ADMIN]}
            />
          </Suspense>
        ),
      },
      {
        path: 'queue/:shopID',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute
              element={<ShopQueue />}
              roles={[USER_ROLES.USER]}
            />
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
        path: 'allpromotions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivateRoute
              element={<AllPromotions />}
              roles={[USER_ROLES.ADMIN]}
            />
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
