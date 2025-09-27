import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6).max(100).nonempty('Password is required'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>;