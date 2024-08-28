import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import queueRoutes from './queue.routes.js';
import shopRoutes from './shop.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/queue', queueRoutes);
router.use('/shop', shopRoutes);

export default router;
