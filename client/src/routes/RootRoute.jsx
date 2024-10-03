import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';
import { USER_ROLES } from '@/constants';
import { lazy } from 'react';

// Home page
const Home = lazy(() => import('@/pages/home/home'));
const Dashboard = lazy(
  () => import('@/pages/dashboard/dashboard'),
);

const RootRoute = () => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated && role === USER_ROLES.USER ? (
    <Home />
  ) : isAuthenticated && role === USER_ROLES.ADMIN ? (
    <Dashboard />
  ) : (
    <Home />
  );
};

export default RootRoute;