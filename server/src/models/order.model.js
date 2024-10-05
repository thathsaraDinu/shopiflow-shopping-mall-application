import mongoose, { Schema, Types } from 'mongoose';

export const OrderSchema = new Schema(
  {
    productID: {
      type: Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      unique: false
    },
    shopID: {
      type: Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Shop ID is required'],
      unique: false
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      unique: false
    },
    buyingPrice: {
      type: Number,
      required: [true, 'Buying price is required'],
      unique: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model.Orders || mongoose.model('Order', OrderSchema);
