import { Router } from 'express';
import ShopController from '../controllers/shop.controller.js';
//import verifyAuth from '../middleware/authorize.js';

const router = Router();

// All routes are prefixed with /api/shop
// Public routes
router.get('/', ShopController.getShops);
// Protected routes - user only

// Admin and user route

// Admin routes
//router.post('/', verifyAuth(['admin']), ShopController.addShop);
router.post('/', ShopController.addShop);

// Update shop - Admin route
router.put('/:id',ShopController.updateShop);

// Delete shop - Admin route
router.delete('/:id',ShopController.deleteShop);

export default router;
