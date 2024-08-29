import { instance } from '@/hooks/use-axios';

// create product
export const createProduct = async (data) => {
  const response = await instance.post('api/product', data);

  return response.data;
};
