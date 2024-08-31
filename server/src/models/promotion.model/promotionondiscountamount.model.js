import mongoose from 'mongoose';
const DiscountAmount = new mongoose.Schema(
  {
    promotionType: {
      type: Number,
      required: true
    },
    storeName: {
      type: String,
      required: true
    },
    qualifyingPurchaseAmount: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    description: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.model.DiscountAmount || mongoose.model('DiscountAmount', DiscountAmount);
