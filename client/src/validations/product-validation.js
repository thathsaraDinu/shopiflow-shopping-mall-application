import { z } from 'zod';

export const productValidation = z.object({
  productID: z
    .string()
    .min(6, {
      message: 'Must be 6 or more characters long',
    })
    .startsWith('PID', {
      message: 'Must provide valid product id',
    }),

  name: z.string().min(1, {
    message: 'Must be 1 or more characters long',
  }),

  category: z.string().min(1, {
    message: 'Must be 1 or more characters long',
  }),

  buyingPrice: z
    .string()
    .min(1, { message: 'Buying price is required' })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'Buying price must be a valid number',
    })
    .transform((val) => parseFloat(val)),

  quantity: z
    .string()
    .min(1, { message: 'Quantity is required' })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'Quantity must be a valid number',
    })
    .transform((val) => parseInt(val)),

  unitPrice: z
    .string()
    .min(1, { message: 'Unit price is required' })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'Unit price must be a valid number',
    })
    .transform((val) => parseFloat(val)),

  supplier: z.string().min(1, {
    message: 'Must be 1 or more characters long',
  }),

  thresholdValue: z
    .string()
    .min(1, { message: 'Threshold value is required' })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'Threshold value must be a valid number',
    })
    .transform((val) => parseInt(val)),
});
