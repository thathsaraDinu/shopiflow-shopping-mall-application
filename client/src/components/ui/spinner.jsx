import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import { BiGame } from 'react-icons/bi';

export const LoadingSpinner = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1976d2"
      fill='none'
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

// Prop Types
LoadingSpinner.propTypes = {
  className: PropTypes.string,
};
