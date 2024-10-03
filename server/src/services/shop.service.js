import ShopSchema from '../models/shop.model.js';
import { getNumberOfQueues, clearShopQueues } from './queue.service.js';

// Get shops
export const getShops = async () => {
  try {
    const shops = await ShopSchema.find();

    for (let i = 0; i < shops.length; i++) {
      const shopID = shops[i]._id;
      const numberOfQueues = await getNumberOfQueues(shopID);
      shops[i] = shops[i].toObject();
      shops[i].numberOfQueues = numberOfQueues;
    }

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
    const updatedShop = await ShopSchema.findByIdAndUpdate(shopId, data, {
      new: true,
      runValidators: true
    });

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

// Get shop by ID
export const getShopById = async (shopId) => {
  try {
    const shop = await ShopSchema.findById(shopId);
    if (!shop) {
      throw {
        status: 404,
        message: 'Shop not found'
      };
    }
    return shop;
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
    if (!shopId) {
      throw {
        status: 400,
        message: 'Shop ID not provided'
      };
    }

    const deletedShop = await ShopSchema.findByIdAndDelete(shopId);
    const deletedShopQueues = await clearShopQueues(shopId);

    if (!deletedShop) {
      throw {
        status: 404,
        message: 'Shop not found'
      };
    }

    if (!deletedShopQueues) {
      throw {
        status: 500,
        message: 'Error deleting shop queues'
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
