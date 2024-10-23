import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name should be between 3 and 50 characters")
    .max(50, "Name should be between 3 and 50 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password should be at least 8 characters"),
});

export const LoginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password should be at least 8 characters"),
});

export const AddProductsFormSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(30, "Product name should be less than 30 characters"),
  productPrice: z
    .string()
    .min(1, "Price is required.")
    .default("")
    .refine((val) => !isNaN(Number(val)), { message: "Invalid Price" }),
  productQuantity: z
    .string()
    .min(1, "Quantity is required.")
    .default("")
    .refine((val) => !isNaN(Number(val)), { message: "Invalid Quantity" }),
});
