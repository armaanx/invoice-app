import { object, string } from "zod";

export const userRegisterSchema = object({
  name: string({
    required_error: "Name is required",
  })
    .trim()
    .min(3, "Name must be between 3 and 50 characters")
    .max(50, "Name must be between 3 and 50 characters"),
  email: string({
    required_error: "Email is required",
  })
    .trim()
    .email({
      message: "Email is invalid",
    }),
  password: string({
    required_error: "Password is required",
  }).min(8, "Password must be at least 8 characters long"),
});

export const userLoginSchema = object({
  email: string({
    required_error: "Email is required",
  })
    .trim()
    .email({
      message: "Email is invalid",
    }),
  password: string({
    required_error: "Password is required",
  }).min(8, "Password must be at least 8 characters long"),
});
