import { z } from 'zod';

// Validation schema for user registration
export const createUserValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'shopOwner']),
  gender: z.enum(['male', 'female'])
});
