import { Router } from "express";
import { PromotionController } from "../controllers/promotion.controller.js";
import validateRequest from "../middleware/validate.js";

const router = Router();

// All routes are prefixed with /api/promotions
// Public routes

router.get('/getpromotions', PromotionController.promotions);
router.post(
  '/addpromotiontype1',
  validateRequest('createPromotionType1'),
  PromotionController.addpromotiontype1
);
router.post(
  '/addpromotiontype2',
  validateRequest('createPromotionType2'),
  PromotionController.addpromotiontype2
);
router.get('/getpromotiontype1/:id', PromotionController.getPromotiontype1ById);
router.get('/getpromotiontype2/:id', PromotionController.getPromotiontype2ById);
router.delete('/deletepromotiontype1/:id', PromotionController.deletePromotionType1);
router.delete('/deletepromotiontype2/:id', PromotionController.deletePromotionType2);
router.put('/updatepromotiontype1/:id', PromotionController.updatePromotionType1);
router.put('/updatepromotiontype2/:id', PromotionController.updatePromotionType2);

export default router;