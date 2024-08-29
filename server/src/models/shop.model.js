import mongoose, { Schema } from 'mongoose';

export const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: false
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.model.Shops || mongoose.model('Shop', ShopSchema);
