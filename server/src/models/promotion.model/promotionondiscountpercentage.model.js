import mongoose from 'mongoose';

const DiscountPercentageSchema = new mongoose.Schema(
  {
    promotionType: {
      type: Number,
      required: true
    },

    storeName: {
      type: String,
      required: true
    },
    discountPercentage: {
      type: Number,
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
    },
    photo: {
      type: String
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.model.DiscountPercentage ||
  mongoose.model('DiscountPercentage', DiscountPercentageSchema);
