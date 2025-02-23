import { instance } from '@/hooks/use-axios';

// Complete Order
export const completeOrder = async (data) => {
  try {
    const response = await instance.post(
      '/api/order',
      data,
    );
    return response;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};
