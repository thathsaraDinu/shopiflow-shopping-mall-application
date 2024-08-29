import { addPromotionAmount, addPromotionPercentage, getAllPromotions } from '../services/promotion.service.js';

export const PromotionController = {
  async promotions(req, res) {
    try {
      const users = getAllPromotions();

      return res.status(200).json({
        users
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype1(req, res) {
    try {
      console.log("test controller")
      const promotion = addPromotionPercentage(req.body);
      console.log('the test inb backend');
      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype2(req, res) {
      try {
         const promotion = addPromotionAmount(req.body);
   
         return res.status(200).json({
         promotion
         });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
};
