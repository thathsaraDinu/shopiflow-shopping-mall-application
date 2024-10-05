import mongoose, { Schema, Types } from 'mongoose';

export const QueueSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: false
    },
    shopID: {
      type: Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Shop ID is required'],
      unique: false
    },
    position: {
      type: Number,
      required: [true, 'Position is required'],
      unique: false
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      unique: false
    },
    orderID: {
      type: Types.ObjectId,
      ref: 'Order',
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model.Queues || mongoose.model('Queue', QueueSchema);
