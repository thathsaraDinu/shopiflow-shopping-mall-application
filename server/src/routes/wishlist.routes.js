import { Router } from 'express';
import verifyAuth from '../middleware/authorize.js';
import WishlistController from '../controllers/wishlist.controller.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

router.get('/', verifyAuth([USER_ROLES.USER]), WishlistController.getWishlist);
router.post('/', verifyAuth([USER_ROLES.USER]), WishlistController.addToWishlist);
router.delete('/:id', verifyAuth([USER_ROLES.USER]), WishlistController.removeFromWishlist);

export default router;
