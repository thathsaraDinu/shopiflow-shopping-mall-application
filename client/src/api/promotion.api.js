import { instance } from '@/hooks/use-axios';

export const addpromotion = async (data) => {
  try {
    console.log(data.promotionType);

    if (data.promotionType === '1') {
      console.log(
        'Sending request to add promotion type 1:',
        data,
      );
      const response = await instance.post(
        '/api/promotions/addpromotiontype1',
        data,
      );
      console.log('Response received:', response);
      return response;
    } else {
      console.log(
        'Sending request to add promotion type 2:',
        data,
      );
      const response = await instance.post(
        '/api/promotions/addpromotiontype2',
        data,
      );
      return response;
    }
  } catch (error) {
    console.error('Error Creating Promotion:', error);
    throw error;
  }
};

export const getPromotions = async () => {
  try {
    const response = await instance.get(
      '/api/promotions/getpromotions',
    );
    console.log('Promotions retrieved:', response);
    return response;
  } catch (error) {
    console.error('Error Getting Promotions:', error);
    throw error;
  }
};

export const getPromotionById = async (id, type) => {
  try {
    let response;
    if (type == 'type1') {
      response = await instance.get(
        `/api/promotions/getpromotiontype1/${id}`,
      );
    } else {
      response = await instance.get(
        `/api/promotions/getpromotiontype2/${id}`,
      );
    }
    console.log('Promotion retrieved:', response);
    return response;
  } catch (error) {
    console.error('Error Getting Promotion:', error);
    throw error;
  }
};

export const deletePromotion = async (
  id,
  promotiontype,
) => {
  try {
    let response;
    if (promotiontype == '1') {
      response = await instance.delete(
        `/api/promotions/deletepromotiontype1/${id}`,
      );
    } else {
      response = await instance.delete(
        `/api/promotions/deletepromotiontype2/${id}`,
      );
    }
    console.log('Promotion deleted:', response);
    return response;
  } catch (error) {
    console.error('Error Deleting Promotion:', error);
    throw error;
  }
};
