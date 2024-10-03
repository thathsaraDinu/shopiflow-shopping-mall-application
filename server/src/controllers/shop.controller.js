import { addShop, getShops, updateShop, getShopById, deleteShop } from '../services/shop.service.js';

const ShopController = {
  // Add shop
  async addShop(req, res) {
    try {
      const data = req.body;
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
      const shops = await getShops();
      return res.status(200).json(shops);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Update shop
  async updateShop(req, res) {
    try {
      const shopId = req.params.id; // Assuming the ID of the shop to be updated is passed as a URL parameter
      const data = req.body;

      const updatedShop = await updateShop(shopId, data); // Call the update service

      return res.status(200).json(updatedShop);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  async getShopById(req, res) {
    try {
      const shopId = req.params.id; // Extract shop ID from the URL
      const shop = await getShopById(shopId); // Fetch shop using the service

      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }

      return res.status(200).json(shop);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Delete shop
  async deleteShop(req, res) {
    try {
      const shopId = req.params.id; // Assuming the ID of the shop to be deleted is passed as a URL parameter

      await deleteShop(shopId); // Call the delete service

      return res.status(200).json({
        message: 'Shop deleted successfully'
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  }
};

export default ShopController;
