import { instance } from '@/hooks/use-axios';

// Get all wishlist items
export const getWishlistItems = async () => {
  const response = await instance.get('api/wishlist');

  return response.data;
};

// Add item to wishlist
export const addToWishlist = async (data) => {
  const response = await instance.post(
    'api/wishlist',
    data,
  );

  return response.data;
};

// Remove item from wishlist
export const removeFromWishlist = async (data) => {
  const response = await instance.delete(
    'api/wishlist/' + data,
  );

  return response.data;
};
