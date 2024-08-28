import { PromotionDiscount} from '../models/promotion.model/promotionondiscountpercentage.model.js';
import {PromotionAmount } from '../models/promotion.model/promotionondiscountamount.model.js';

// Get all promotions
export const getAllPromotions = async () => {
  try {
    // Find all promotions
    const discountPercentage = await PromotionDiscount.find();
    const discountAmount = await PromotionAmount.find();

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

// Add a new promotion
