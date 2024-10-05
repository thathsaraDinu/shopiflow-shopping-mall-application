import { Router } from 'express';
import OrderController from '../controllers/order.controller.js';
import verifyAuth from '../middleware/authorize.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// All routes are prefixed with /api/order
// Protected routes - Admin only
router.post('/', verifyAuth([USER_ROLES.ADMIN]), OrderController.createOrder);

export default router;
