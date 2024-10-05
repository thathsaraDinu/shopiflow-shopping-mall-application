import { z } from 'zod';

export const schema1 = z.object({
  promotionType: z.enum(['1', '3'], {
    message: 'Please select a promotion type',
  }),
});

export const schema2 = z.object({
  promoTitle: z
    .string()
    .min(1, { message: 'Promotion title is required' })
    .max(255),

  discountPercentage: z
    .string()
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: 'Must be a valid number',
    }) // Ensure it's a valid number
    .refine((val) => val >= 1 && val <= 100, {
      message: 'Must be between 1 and 100',
    }), // Ensure it's in the range

  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(255),
});

export const schema3 = z.object({
  promoTitle: z
    .string()
    .min(1, { message: 'Promotion title is required' })
    .max(255),

  discountAmount: z
    .string()
    .min(1, { message: 'Discount amount is required' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Must be a valid number',
    }),

  qualifyingPurchaseAmount: z
    .string()
    .min(1, { message: 'Purchase amount is required' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Must be a valid number',
    }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(255),
});

export const schema4 = z.object({
  startDate: z
    .string()
    .min(1, { message: 'Start date is required' })
    .refine(
      (date) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const startDate = new Date(date).setHours(
          0,
          0,
          0,
          0,
        );
        return startDate >= today;
      },
      {
        message: 'Start date cannot be earlier than today',
      },
    ),

  endDate: z
    .string()
    .min(1, { message: 'End date is required' }),
  photo: z
    .instanceof(File, {
      message: 'Please upload a valid file',
    }) // Ensure the input is a File instance
    .refine(
      (file) => file.size <= 5000000,
      'Max file size is 5MB',
    ) // File size validation (max 5MB)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(
          file.type,
        ),
      'Only JPEG, PNG, or WebP formats are allowed',
    ), // File type validation
});
