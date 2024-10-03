import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import queueRoutes from './queue.routes.js';
import shopRoutes from './shop.routes.js';
import promotionRoutes from './promotion.routes.js';
import wishlistRoutes from './wishlist.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/queue', queueRoutes);
router.use('/shop', shopRoutes);
router.use('/promotions', promotionRoutes);
router.use('/wishlist', wishlistRoutes);

export default router;
