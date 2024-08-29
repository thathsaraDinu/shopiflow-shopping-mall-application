import { instance } from '@/hooks/use-axios';

// Get shops
export const getShops = async () => {
  try {
    const response = await instance.get('/api/shop');
    return response.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};
