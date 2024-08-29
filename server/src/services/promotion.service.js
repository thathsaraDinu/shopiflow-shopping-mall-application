import DiscountPercentageSchema from '../models/promotion.model/promotionondiscountpercentage.model.js';
import DiscountAmount from '../models/promotion.model/promotionondiscountamount.model.js';
// Get all promotions
export const getAllPromotions = async () => {
  try {
    // Find all promotions
    const discountPercentage = await DiscountPercentageSchema.find();
    const discountAmount = await DiscountAmount.find();
    console.log("test controller");
    

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



// Add a new promotion type percentage discount

export const addPromotionPercentage = async (data) => {
  try {
    // Create a new promotion
    const promotion = await DiscountPercentageSchema.create(data);

    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
}

export const addPromotionAmount = async (data) => {
  try {
    // Create a new promotion
    const promotion = await DiscountAmount.create(data);

    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
}