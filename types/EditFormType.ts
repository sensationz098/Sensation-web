import * as z from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  phone: z
    .string()
    .trim()
    .min(8, "Contact is too short")
    .max(16, "Contact is too long")
    .regex(/^\+?[0-9]+$/, "Invalid contact format"),
  dob: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
