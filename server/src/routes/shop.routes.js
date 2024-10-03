import { Router } from 'express';
import ShopController from '../controllers/shop.controller.js';

const router = Router();


router.get('/', ShopController.getShops);

router.post('/', ShopController.addShop);

router.put('/:id', ShopController.updateShop);
router.get('/:id', ShopController.getShopById); // Route to get shop by ID

router.delete('/:id', ShopController.deleteShop);

export default router;
