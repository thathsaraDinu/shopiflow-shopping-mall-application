import { getWishlistItems } from '@/api/wishlist.api';
import { useWishlitStore } from '@/store/wishlist-store';
import { useState, useEffect } from 'react';

const useWishlist = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setWishlistData = useWishlitStore(
    (state) => state.setWishlistData,
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getWishlistItems();

      setIsLoading(false);
      setData(response.data);
      setWishlistData(response.data.products.length);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};

export default useWishlist;
