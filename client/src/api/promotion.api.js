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
        {withCredentials: true,}
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
        { withCredentials: true },
      );
      return response;
    }
  } catch (error) {
    console.error('Error Creating Promotion:', error);
    throw error;
  }
};

export const getPromotionsByShopId = async (id) => {
  try {

    const response = await instance.get(
      `/api/promotions/getpromotionsbyshopid/${id}`,
      { withCredentials: true },
    );
    console.log('Promotions retrieved in shop id:', response);
    return response;
    
  } catch (error) {
    console.error('Error Getting Promotions:', error);
    throw error;
  }
};

export const getPromotions = async () => {
  try {
    const response = await instance.get(
      '/api/promotions/getpromotions',
      { withCredentials: true },
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

export const updatePromotion = async (data) => {
  try {
    let response;
    if (data.data.promotionType == '1') {
      response = await instance.put(
        `/api/promotions/updatepromotiontype1/${data.id}`,
        data.data,
        { withCredentials: true },
      );
    } else {
      response = await instance.put(
        `/api/promotions/updatepromotiontype2/${data.id}`,
        data.data,
        { withCredentials: true },
      );
    }
    return response;
  } catch (error) {
    console.error('Error Updating Promotion:', error);
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
        { withCredentials: true },
      );
    } else {
      response = await instance.delete(
        `/api/promotions/deletepromotiontype2/${id}`,
        { withCredentials: true },
      );
    }
    console.log('Promotion deleted:', response);
    return response;
  } catch (error) {
    console.error('Error Deleting Promotion:', error);
    throw error;
  }
};
