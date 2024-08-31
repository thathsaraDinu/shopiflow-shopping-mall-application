import mongoose, { Schema } from 'mongoose';

// Define the schema for shop items
const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name is required']
  },
  price: {
    type: Number,
    required: [true, 'Item price is required']
  }
});

export const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: false
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    },
    items: [ItemSchema],  // Array of items sold in the shop
    openTime: {
      type: String,
      required: [true, 'Open time is required']
    },
    contactNumber: {
      type: String, // Use String to accommodate different phone number formats
      required: [true, 'Contact number is required']
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.models.Shop || mongoose.model('Shop', ShopSchema);
