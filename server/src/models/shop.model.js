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
      type: String
    },
    items: [ItemSchema], // Array of items sold in the shop
    openTime: {
      type: String,
      required: [true, 'Open time is required']
    },
    contactNumber: {
      type: String, // Use String to accommodate different phone number formats
      required: [true, 'Contact number is required']
    },
    ownerEmail: {
      // New field for owner's email
      type: String,
      required: [true, 'Owner email is required'],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation regex
        },
        message: (props) => `${props.value} is not a valid email address!`
      }
    },
    ownerId: {
      // New field for owner's ID
      type: Schema.Types.ObjectId,
      required: [true, 'Owner ID is required']
    },
    shopType: {
      // New field for shop type
      type: String,
      required: [true, 'Shop type is required'] // You can set this as required or optional
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } // Set timezone to UTC+5:30
  }
);

// Export the Shop model
export default mongoose.models.Shop || mongoose.model('Shop', ShopSchema);
