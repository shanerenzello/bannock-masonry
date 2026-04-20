import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(30, "Phone number is too long"),
  email: z.email("Please enter a valid email address").or(z.literal("")).optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactFormErrors = z.inferFlattenedErrors<
  typeof contactSchema
>["fieldErrors"];
