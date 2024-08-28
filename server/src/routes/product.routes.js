import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import validateRequest from '../middleware/validate.js';

const router = Router();

router.post('/', validateRequest('createProduct'), productController.createProduct);

export default router;
