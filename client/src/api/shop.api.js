import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/shop';

export const getShops = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createShop = async (shopData) => {
  const response = await axios.post(apiUrl, shopData);
  return response.data;
};

export const getShopById = async (shopId) => {
  const response = await axios.get(`${apiUrl}/${shopId}`);
  return response.data;
};


export const updateShop = async (shopId, updatedData) => {
  const response = await axios.put(`${apiUrl}/${shopId}`, updatedData);
  return response.data;
};

export const deleteShop = async (shopId) => {
  const response = await axios.delete(`${apiUrl}/${shopId}`);
  return response.data;
};
