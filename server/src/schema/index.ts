import { array, number, object, string } from "zod";

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

export const productSchema = object({
  productName: string({
    required_error: "Product Name is required",
  })
    .trim()
    .min(1, "Product Name is required")
    .max(30, "Product Name should be between 3 and 30 characters"),
  productPrice: number()
    .positive("Product Price is invalid")
    .min(0.01, "Product Price should be greater than 0"),
  productQuantity: number()
    .positive("Product Quantity is invalid")
    .min(1, "Product Quantity should be greater than 0"),
  totalPrice: number()
    .positive("Total Price is invalid")
    .min(0.01, "Total Price should be greater than 0"),
});

export const invoiceSchema = object({
  createdById: string({
    required_error: "Id Required",
  })
    .trim()
    .min(3)
    .max(50),
  createdByEmail: string().email().trim().nullable(),
  createdByName: string().trim().nullable(),
  products: array(productSchema).min(1, "Products are required"),
  totalPriceInvoice: number({
    required_error: "Invoice Total Price is Required",
  })
    .positive("Total Price is invalid")
    .min(0.01, "Total Price should be greater than 0"),
});
