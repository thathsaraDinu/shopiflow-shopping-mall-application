import { Router } from 'express';
import QueueController from '../controllers/queue.controller.js';
import verifyAuth from '../middleware/authorize.js';

const router = Router();

// All routes are prefixed with /api/queue
// Public routes
router.get('/:shopID', QueueController.getQueues);

// Protected routes - user only
router.get('/', verifyAuth(['user']), QueueController.getUserQueues);
router.post('/:shopID', verifyAuth(['user']), QueueController.joinQueue);
router.put('/:shopID', verifyAuth(['user']), QueueController.changeQueuePosition);
router.delete('/:id', verifyAuth(['user']), QueueController.leaveQueue);

// Admin and user route
router.get('/:shopID', verifyAuth(['user']), QueueController.getQueues);

// Admin routes
router.delete('/:shopID/clear', verifyAuth(['admin']), QueueController.clearShopQueues);

export default router;
