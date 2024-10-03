import { getWishlistItems } from '@/api/wishlist.api';
import React, { useState, useEffect } from 'react';

const useWishlist = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getWishlistItems();

      setIsLoading(false);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};

export default useWishlist;
