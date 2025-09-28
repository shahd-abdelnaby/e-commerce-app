import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100).nonempty('Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6).max(100).nonempty('Password is required'),
  rePassword: z.string().min(6).max(100).nonempty('Confirm Password is required'),
  phone: z.string().regex(/^(2|\+2)?01[0125][0-9]{8}$/, 'Invalid phone number').nonempty('Phone number is required'),
}).refine((object) => object.password === object.rePassword, {
  error: 'Passwords must match',
  path: ['rePassword'],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;