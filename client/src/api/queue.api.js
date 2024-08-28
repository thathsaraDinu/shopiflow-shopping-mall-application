import { instance } from '@/hooks/use-axios';

// Get
export const getQueues = async (shopID) => {
  try {
    const response = await instance.get('/api/queue');
    return response.data;
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};
