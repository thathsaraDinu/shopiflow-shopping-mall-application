import {
  addPromotionAmount,
  addPromotionPercentage,
  deletePromotionType1,
  deletePromotionType2,
  getAllPromotions,
  getPromotionType1ById,
  getPromotionType2ById
} from '../services/promotion.service.js';

export const PromotionController = {
  async promotions(req, res) {
    try {
      const promotions = await getAllPromotions();

      return res.status(200).json({
        promotions
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype1(req, res) {
    try {
      console.log('test controller');

      // Await the result of the addPromotionPercentage function
      const promotion = await addPromotionPercentage(req);

      console.log('the test in backend:', promotion);

      // Send a success response with the promotion data
      return res.status(200).json({
        promotion
      });
    } catch (error) {
      console.error('Error adding promotion:', error);

      // Send an error response with the error message
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype2(req, res) {
    try {
      const promotion = await addPromotionAmount(req.body);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getPromotiontype1ById(req, res) {
    try {
      const promotion = await getPromotionType1ById(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getPromotiontype2ById(req, res) {
    try {
      const promotion = await getPromotionType2ById(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deletePromotionType1(req, res) {
    try {
      const promotion = await deletePromotionType1(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deletePromotionType2(req, res) {
    try {
      const promotion = await deletePromotionType2(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
