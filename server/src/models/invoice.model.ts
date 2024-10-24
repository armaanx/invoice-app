import mongoose, { Document, Model, Schema } from "mongoose";

export interface IInvoice extends Document {
  createdById: string;
  createdByName: string;
  createdByEmail: string;
  products: {
    productName: string;
    productPrice: number;
    productQuantity: number;
    totalPrice: number;
  }[];
  totalPriceInvoice: number;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    createdById: { type: String, required: true, trim: true },
    createdByName: { type: String, trim: true },
    createdByEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    products: [
      {
        productName: { type: String, required: true, trim: true },
        productPrice: { type: Number, required: true },
        productQuantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    totalPriceInvoice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Invoice: Model<IInvoice> = mongoose.model<IInvoice>(
  "Invoice",
  invoiceSchema
);
