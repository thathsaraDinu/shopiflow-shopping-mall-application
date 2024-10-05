import { createOrder, getAllOrders, getOrderById, deleteOrder } from '../services/order.service.js';

class OrderController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const newOrder = await createOrder(orderData);
      return res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ message: 'Failed to create order' });
    }
  }

  // Get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Failed to fetch orders' });
    }
  }

  // Get an order by ID
  async getOrderById(req, res) {
    const { orderId } = req.params;
    try {
      const order = await getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      return res.status(500).json({ message: 'Failed to fetch order' });
    }
  }

  // Delete an order
  async deleteOrder(req, res) {
    const { orderId } = req.params;
    try {
      const deletedOrder = await deleteOrder(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ message: 'Failed to delete order' });
    }
  }
}

export default new OrderController();
