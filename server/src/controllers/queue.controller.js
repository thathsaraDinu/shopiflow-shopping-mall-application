import {
  getQueues,
  getNumberOfQueues,
  getUserShopQueue,
  getUserQueues,
  joinQueue,
  changeQueuePosition,
  leaveQueue,
  clearShopQueues
} from '../services/queue.service.js';

const QueueController = {
  // Get all queues in a shop by shop ID
  async getQueues(req, res) {
    try {
      // Get the shop ID from the request
      const shopID = req.params.shopID;

      // Get all queues in the shop
      const queues = await getQueues(shopID);

      return res.status(200).json(queues);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Get count of all queues in a shop by shop ID
  async getNumberOfQueues(req, res) {
    try {
      // Get the shop ID from the request
      const shopID = req.params.shopID;

      // Get the number of queues in the shop
      const numberOfQueues = await getNumberOfQueues(shopID);

      return res.status(200).json({
        numberOfQueues
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Get a all queues of a user
  async getUserQueues(req, res) {
    try {
      // Get the user ID from the request
      const userID = req.user.id;

      // Get all queues of the user
      const queues = await getUserQueues(userID);

      return res.status(200).json(queues);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Join a queue
  async joinQueue(req, res) {
    try {
      // Get the user ID from the request
      const userID = req.user.id;

      // Get the shop ID from the request
      const shopID = req.params.shopID;

      // Check if the user is already in the queue
      const existingQueue = await getUserShopQueue(userID, shopID);

      if (existingQueue) {
        return res.status(400).json({
          message: 'User is already in the queue'
        });
      }

      // Create a new queue object
      const queue = {
        userID,
        shopID
      };

      // Add the user to the queue
      await joinQueue(queue);

      return res.status(201).json({
        message: 'User added to the queue'
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  // Change queue position
  async changeQueuePosition(req, res) {},

  // Leave a queue
  async leaveQueue(req, res) {
    try {
      // Get the user ID from the request
      const userID = req.user.id;

      // Get the queue ID from the request
      const id = req.params.id;

      // Remove the user from the queue
      await leaveQueue(userID, id);

      return res.status(200).json({
        message: 'User removed from the queue'
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  },

  async clearShopQueues(req, res) {
    try {
      // Get the shop ID from the request
      const shopID = req.params.shopID;

      console.log('ID', shopID);
      // Clear all queues in the shop
      await clearShopQueues(shopID);

      return res.status(200).json({
        message: 'All queues in the shop have been cleared'
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  }
};

export default QueueController;
