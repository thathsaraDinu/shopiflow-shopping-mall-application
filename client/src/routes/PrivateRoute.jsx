import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

// Prop types
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
