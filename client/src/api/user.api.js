import { instance } from '@/hooks/use-axios';

export const UserRegister = async (data) => {
  const response = await instance.post('/api/user', data);
  return response.data;
};

export const getProfileData = async () => {
  try {
    const response = await instance.get(
      '/api/user/profile',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
