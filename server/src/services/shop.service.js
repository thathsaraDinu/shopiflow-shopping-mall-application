import ShopSchema from '../models/shop.model.js';


// Get shops
export const getShops = async () => {
  try {
    const shops = await ShopSchema.find();
    return shops;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};


// Add shop
export const addShop = async (data) => {
  try {
    const shop = new ShopSchema(data);
    await shop.save();
    return shop;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Update shop
export const updateShop = async (shopId, data) => {
  try {
    const updatedShop = await ShopSchema.findByIdAndUpdate(shopId, data, { new: true, runValidators: true });

    if (!updatedShop) {
      throw {
        status: 404,
        message: 'Shop not found'
      };
    }

    return updatedShop;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message
    };
  }
};


// Delete shop
export const deleteShop = async (shopId) => {
  try {
    const deletedShop = await ShopSchema.findByIdAndDelete(shopId);

    if (!deletedShop) {
      throw {
        status: 404,
        message: 'Shop not found'
      };
    }

    return;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message
    };
  }
};
