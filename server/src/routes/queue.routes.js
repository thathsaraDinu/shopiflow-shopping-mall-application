import { Router } from 'express';
import QueueController from '../controllers/queue.controller.js';
import verifyAuth from '../middleware/authorize.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// All routes are prefixed with /api/queue
// Public routes
router.get('/:shopID', QueueController.getQueues);

// Protected routes - user only
router.get('/', verifyAuth([USER_ROLES.USER]), QueueController.getUserQueues);
router.post('/:shopID', verifyAuth([USER_ROLES.USER]), QueueController.joinQueue);
router.put('/:shopID', verifyAuth([USER_ROLES.USER]), QueueController.changeQueuePosition);
router.delete('/:id', verifyAuth([USER_ROLES.USER]), QueueController.leaveQueue);

// Admin and user route
router.get('/:shopID', verifyAuth([USER_ROLES.ADMIN, USER_ROLES.USER]), QueueController.getQueues);

// Admin routes
router.delete('/:shopID/clear', verifyAuth([USER_ROLES.ADMIN]), QueueController.clearShopQueues);

export default router;
