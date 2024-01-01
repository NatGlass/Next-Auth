import {z} from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Please enter a password of at least 6 characters',
  }),
  name: z.string().min(1, {
    message: 'Please enter your name',
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
