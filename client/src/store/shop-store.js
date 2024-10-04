import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial state
const initialState = {
  shopId: null,
};

// Create the store with the persist middleware
export const useShopStore = create(
  persist(
    (set) => ({
      ...initialState,
      setShopData: (data) => {
        set({
          shopId: data.shopId, // Set the shopId from the passed data
        });
      },
    }),
    {
      name: 'shop-store', // Key in local storage
      // blacklist: ['shopId'], // If you want to prevent persisting shopId, uncomment this line
    },
  ),
);
