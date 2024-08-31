import { instance } from '@/hooks/use-axios';

// Get queues
export const getQueues = async (shopID) => {
  try {
    const response = await instance.get(
      `/api/queue/${shopID}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};

// Join queue
export const joinQueue = async (shopID) => {
  try {
    const response = await instance.post(
      `/api/queue/${shopID}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error joining queue:', error);
    throw error;
  }
};
