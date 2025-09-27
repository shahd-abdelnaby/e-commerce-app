import * as z from "zod";

export const checkOutSchema = z.object({
  details: z.string().nonempty("details can`t be empty"),
  phone: z
    .string()
    .nonempty("phone can`t be empty")
    .regex(/^01[0125][0-9]{8}$/, "not valid phone number"),
  city: z.string().nonempty("city can`t be empty"),
});

export type checkOutSchemaType = z.infer<typeof checkOutSchema>;
