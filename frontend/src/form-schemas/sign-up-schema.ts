import z from "zod";

export const signUpFormSchema = z
  .object({
    first_name: z.string().min(2, "First name required"),
    last_name: z.string().min(2, "Last name required"),
    email: z.email("Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .min(8, "Phone number must be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
