// Server Base Url
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// User roles enums
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

// Queue status constants
export const QUEUE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  HOLD: 'hold',
  COMPLETED: 'completed',
  LEAVED: 'leaved',
  CANCELLED: 'cancelled',
};
