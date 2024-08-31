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


export default router;