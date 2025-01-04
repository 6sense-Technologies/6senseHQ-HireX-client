import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email address is required.' })
    .min(1, { message: 'Email address is required.' })
    .email('Please enter a valid email address.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, { message: 'Password is required.' })
    .min(8, 'Password must be at least 8 characters long.'),
});
