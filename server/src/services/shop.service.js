import ShopSchema from '../models/shop.model.js';

// Add shop
export const addShop = async (data) => {
  try {
    // Create a new shop
    const shop = new ShopSchema(data);

    // Save the shop
    await shop.save();

    return shop;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get shops
export const getShops = async () => {
  try {
    // Find all shops
    const shops = await ShopSchema.find();

    return shops;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};
