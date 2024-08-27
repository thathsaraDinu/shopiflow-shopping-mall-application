import mongoose, { Schema } from 'mongoose';

export const QueueSchema = new Schema(
  {
    queueID: {
      type: Object,
      required: [true, 'Queue ID is required'],
      unique: true
    },
    userID: {
      type: Object,
      required: [true, 'User ID is required'],
      unique: false
    },
    shopID: {
      type: Object,
      required: [true, 'Shop ID is required'],
      unique: false
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.model.Queues || mongoose.model('Queue', QueueSchema);
