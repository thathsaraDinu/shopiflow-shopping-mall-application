import { userLogout } from '@/api/auth.api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial state
const initialState = {
  isLoggedIn: false,
  accessToken: null,
  role: null,
};

// Create the store with the persist middleware
export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken) => {
        set({
          isLoggedIn: true,
          accessToken: accessToken,
        });
      },
      profile: (role) => {
        set({
          role: role,
        });
      },
      logOut: () => {
        userLogout();
        set({
          isLoggedIn: false,
          accessToken: null,
          role: null,
        });
        localStorage.clear();
      },
    }),
    {
      name: 'auth-store', // Key in local storage
      blacklist: ['isLoggedIn'], // Do not persist `isLoggedIn` in local storage
    },
  ),
);
