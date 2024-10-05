import { Router } from 'express';
import { PromotionController } from '../controllers/promotion.controller.js';
import validateRequest from '../middleware/validate.js';
import verifyAuth from '../middleware/authorize.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// All routes are prefixed with /api/promotions
// Public routes

router.get(
  '/getpromotions',

  PromotionController.promotions
);
router.post(
  '/addpromotiontype1',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  validateRequest('createPromotionType1'),
  PromotionController.addpromotiontype1
);
router.post(
  '/addpromotiontype2',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  validateRequest('createPromotionType2'),
  PromotionController.addpromotiontype2
);

router.get('/getpromotiontype1/:id', PromotionController.getPromotiontype1ById);
router.get('/getpromotiontype2/:id', PromotionController.getPromotiontype2ById);
router.delete(
  '/deletepromotiontype1/:id',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  PromotionController.deletePromotionType1
);
router.delete(
  '/deletepromotiontype2/:id',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  PromotionController.deletePromotionType2
);
router.put(
  '/updatepromotiontype1/:id',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  PromotionController.updatePromotionType1
);
router.put(
  '/updatepromotiontype2/:id',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]),
  PromotionController.updatePromotionType2
);

router.get(
  '/getpromotionsbyshopid/:id',
  verifyAuth([USER_ROLES.ADMIN]),
  PromotionController.getpromotionsbyshopid
);

export default router;
