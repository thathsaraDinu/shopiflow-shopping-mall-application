import mongoose, { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    productID: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: false
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      unique: false
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      unique: false
    },
    buyingPrice: {
      type: Number,
      required: [true, 'Product buying price is required'],
      unique: false
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      unique: false
    },
    unitPrice: {
      type: Number,
      required: [true, 'Product unit price is required'],
      unique: false
    },
    supplier: {
      type: String,
      required: [true, 'Product supplier is required'],
      unique: false
    },
    thresholdValue: {
      type: Number,
      required: [true, 'Product thresholdValue is required'],
      unique: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', ProductSchema);
