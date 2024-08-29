import { addShop, getShops } from '../services/shop.service.js';

const ShopController = {
  // Add shop
  async addShop(req, res) {
    try {
      // Get the shop data from the request
      const data = req.body;

      // Add the shop
      const shop = await addShop(data);

      return res.status(201).json(shop);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Get shops
  async getShops(req, res) {
    try {
      // Get all shops
      const shops = await getShops();

      return res.status(200).json(shops);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  }
};

export default ShopController;
