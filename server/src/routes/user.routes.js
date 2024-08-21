import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import verifyAuth from '../middleware/authorize.js';
import validateRequest from '../middleware/validate.js';

const router = Router();

// All routes are prefixed with /api/users
// Public routes
router.post('/', validateRequest('createUser'), UserController.register);

// User only routes
router.get('/profile', verifyAuth(['admin', 'user']), UserController.profile);

export default router;
