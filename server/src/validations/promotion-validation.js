import { z } from 'zod';

export const createPromotionType1Validation = z.object({
  promotionType: z.enum(['1', '3'], {
    message: 'Please select a promotion type'
  }),
  storeName: z.string().min(1, { message: 'Store name is required' }).max(255),
  discountPercentage: z
    .number()
    .min(1, { message: 'Discount percentage must be at least 1.' })
    .max(100, { message: 'Discount percentage cannot exceed 100.' }),
  applicableItems: z
    .array(
      z.union([
        z.string().min(1, { message: 'Please add an Item' }),

        z.undefined() // Allow undefined values
      ])
    )
    .min(1)
    .max(255),
  description: z.string().min(1, { message: 'Description is required' }).max(255)
});

export const createPromotionType2Validation = z.object({
  promotionType: z.enum(['1', '3'], {
    message: 'Please select a promotion type'
  }),
  storeName: z.string().min(1, { message: 'Store name is required' }).max(255),
  discountAmount: z
    .number().min(1),

  qualifyingPurchaseAmount: z
    .number().min(1),
    
  description: z.string().min(1, { message: 'Description is required' }).max(255),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' })
});
