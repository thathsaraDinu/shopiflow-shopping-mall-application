import { instance } from '@/hooks/use-axios';

// Get queues by shop ID and Query Params
export const getQueues = async (shopID, status) => {
  try {
    const response = await instance.get(
      `/api/queue/${shopID}`,
      {
        params: {
          status,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};

// Get user's queues
export const getUserQueues = async () => {
  try {
    const response = await instance.get(`/api/queue`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user queues:', error);
    throw error;
  }
};

// Get number of queues by shop ID
export const getNumberOfQueues = async (shopID) => {
  try {
    const response = await instance.get(
      `/api/queue/${shopID}/count`,
    );
    return response.data.numberOfQueues;
  } catch (error) {
    console.error(
      'Error fetching number of queues:',
      error,
    );
    throw error;
  }
};

// Join queue
export const joinQueue = async (queueID) => {
  try {
    const response = await instance.post(
      `/api/queue/${queueID}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error joining queue:', error);
    throw error;
  }
};

// Update queue status (admin only)
export const updateQueueStatus = async (data) => {
  try {
    const response = await instance.put(
      `/api/queue/update/${data.queueID}`,
      { status: data.status },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating queue status:', error);
    throw error;
  }
};

// Leave from a queue
export const leaveQueue = async (queueID) => {
  try {
    const response = await instance.delete(
      `/api/queue/${queueID}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error leaving queue:', error);
    throw error;
  }
};
