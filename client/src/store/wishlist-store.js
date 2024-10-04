import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial state
const initialState = {
  count: 0,
};

// Create the store with the persist middleware
export const useWishlitStore = create(
  persist(
    (set) => ({
      ...initialState,
      setWishlistData: (data) => {
        set({
          count: data,
        });
      },
    }),
    {
      name: 'wishlist-store', // Key in local storage
    },
  ),
);
