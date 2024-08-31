import { z } from 'zod';

export const createProductValidation = z.object({
  productID: z
    .string()
    .min(6, { message: 'Must be 6 or more characters long' })
    .startsWith('PID', { message: 'Must provide valid product id' }),
  name: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  category: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  buyingPrice: z.number().positive(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  supplier: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  thresholdValue: z.number().int().positive()
});
