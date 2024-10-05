import DiscountPercentageSchema from '../models/promotion.model/promotionondiscountpercentage.model.js';
import DiscountAmount from '../models/promotion.model/promotionondiscountamount.model.js';
// Get all promotions
export const getAllPromotions = async (req) => {
  try {
    // Find all promotions
    const discountPercentage = await DiscountPercentageSchema.find();
    const discountAmount = await DiscountAmount.find();

    return {
      discountPercentage,
      discountAmount
    };
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const getPromotionsByShopId = async (shopId) => {
  try {
    const discountPercentage = await DiscountPercentageSchema.find({ shopId });
    const discountAmount = await DiscountAmount.find({ shopId });
    return {
      discountPercentage,
      discountAmount
    };
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const getPromotionType1ById = async (id) => {
  try {
    const promotion = await DiscountPercentageSchema.findById(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const getPromotionType2ById = async (id) => {
  try {
    const promotion = await DiscountAmount.findById(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const deletePromotionType1 = async (id) => {
  try {
    const promotion = await DiscountPercentageSchema.findByIdAndDelete(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const deletePromotionType2 = async (id) => {
  try {
    const promotion = await DiscountAmount.findByIdAndDelete(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const updatePromotionType1 = async (id, data) => {
  try {
    const promotion = await DiscountPercentageSchema.findByIdAndUpdate(id, data);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const updatePromotionType2 = async (id, data) => {
  try {
    const promotion = await DiscountAmount.findByIdAndUpdate(id, data, {
      new: true
    });
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Add a new promotion type percentage discount

export const addPromotionPercentage = async (data) => {
  try {
    const {
      promotionType,
      shopId,
      promoTitle,
      storeName,
      startDate,
      endDate,
      description,
      discountPercentage,
      photo
    } = data.body;

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        status: 400,
        message: 'Invalid Date format for startDate or endDate'
      };
    }

    const isActive = now >= start && now <= end;

    const newPromotion = new DiscountPercentageSchema({
      promotionType: 1,
      storeName,
      discountPercentage,
      startDate: start,
      endDate: end,
      description,
      isActive,
      promoTitle,
      shopId,
      photo
    });

    const savedPromotion = await newPromotion.save();
    return savedPromotion;
  } catch (error) {
    console.error('Error saving promotion:', error);
    if (!error.status) {
      error.status = 500;
      error.message = 'Failed to save the promotion';
    }
    throw error;
  }
};

export const addPromotionAmount = async (data) => {
  try {
    const {
      promotionType,
      storeName,
      startDate,
      endDate,
      description,
      discountAmount,
      qualifyingPurchaseAmount,
      photo,
      shopId,
      promoTitle
    } = data;

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        status: 400,
        message: 'Invalid Date format for startDate or endDate'
      };
    }

    const isActive = now >= start && now <= end;

    const newPromotion = new DiscountAmount({
      promotionType: 3,
      storeName,
      discountAmount,
      qualifyingPurchaseAmount,
      startDate: start,
      endDate: end,
      description,
      isActive,
      photo,
      promoTitle,
      shopId
    });

    const savedPromotion = await newPromotion.save();
    return savedPromotion;
  } catch (error) {
    console.error('Error saving promotion:', error);
    if (!error.status) {
      error.status = 500;
      error.message = 'Failed to save the promotion';
    }
    throw error;
  }
};
