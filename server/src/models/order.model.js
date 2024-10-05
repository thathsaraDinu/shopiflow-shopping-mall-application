import mongoose, { Schema, Types } from 'mongoose';

const OrderItemSchema = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  buyingPrice: {
    type: Number,
    required: [true, 'Buying price is required']
  }
});

const OrderSchema = new Schema(
  {
    shopId: {
      type: Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Shop ID is required']
    },
    items: [OrderItemSchema], // Array of order items
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required']
    },
    queueId: {
      type: Types.ObjectId,
      ref: 'Queue',
      required: [true, 'Queue ID is required'],
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Orders || mongoose.model('Order', OrderSchema);
