import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
