import { Router } from 'express';
import WishlistController from '../controllers/wishlist.controller.js';

const router = Router();

router.get('/', WishlistController.getWishlist);
router.post('/', WishlistController.addToWishlist);
router.delete('/', WishlistController.removeFromWishlist);

export default router;
