import { QUEUE_STATUS } from '../constants/constants.js';
import Order from '../models/order.model.js';
import { updateQueueStatus } from './queue.service.js';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    // Create a new order
    const newOrder = new Order(orderData);

    // Save the order
    const order = await newOrder.save();

    // If order is not saved, throw an error
    if (!order) {
      throw {
        status: 500,
        message: 'Failed to create order'
      };
    }

    // If saved, change queue status to 'completed'
    if (order.queueId) {
      await updateQueueStatus(order.queueId, QUEUE_STATUS.COMPLETED, order._id);
    }

    return order;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get all orders
export const getAllOrders = async () => {
  return await Order.find().populate('shopID').populate('items.productID');
};

// Get an order by ID
export const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate('shopID').populate('items.productID');
};

// Delete an order
export const deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};
