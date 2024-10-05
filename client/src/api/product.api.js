import { instance } from '@/hooks/use-axios';

// create product
export const createProduct = async (data) => {
  const response = await instance.post('api/product', data);

  return response.data;
};

// get all products
export const getAllProducts = async () => {
  const response = await instance.get('api/product');

  return response.data;
};

// get product by id
export const getProductById = async (id) => {
  const response = await instance.get('api/product/' + id);

  return response.data;
};

// update product by id
export const updateProduct = async (data) => {
  const response = await instance.put('api/product/', data);

  return response.data;
};

// delete product by id
export const deleteProductById = async (id) => {
  const response = await instance.delete(
    'api/product/' + id,
  );

  return response.data;
};
