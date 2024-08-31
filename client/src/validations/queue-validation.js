import { z } from 'zod';

// Zod validation schema
export const joinQueueValidation = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must ready to join the queue',
  }),
});
