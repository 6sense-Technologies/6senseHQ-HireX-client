import { z } from 'zod';
import { passwordRegex } from '@/constants/globalConstants';

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



export const SignupSchema = z
  .object({
    name: z
      .string({ required_error: 'Full name is required.' })
      .min(1, { message: 'Full name is required.' }),
    email: z
      .string({ required_error: 'Email address is required.' })
      .min(1, { message: 'Email address is required.' })
      .email('Please enter a valid email address.'),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(8, 'Password requirements not fulfilled.')
      .regex(passwordRegex, 'Password requirements not fulfilled.'),
    Cpassword: z
      .string({ required_error: 'Confirm password is required.' })
      .min(8, 'Password requirements not fulfilled.')
      .regex(passwordRegex, 'Password requirements not fulfilled.'),
    roleNames: z
      .array(z.string({ required_error: 'Role is required.' }))
      .min(1, { message: 'Role is required.' }),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.Cpassword && data.password !== data.Cpassword) {
      ctx.addIssue({
        path: ['password'],
        message: "Passwords doesn't match.",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.password && data.Cpassword && data.password !== data.Cpassword) {
      ctx.addIssue({
        path: ['Cpassword'],
        message: "Passwords doesn't match.",
        code: z.ZodIssueCode.custom,
      });
    }
  });