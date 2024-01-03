import {z} from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
  code: z.optional(z.string())
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

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export type ResetSchemaType = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Please enter a password of at least 6 characters',
  }),
});

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
