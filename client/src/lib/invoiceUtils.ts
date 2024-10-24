import api from "@/api/api";

export interface InvoiceType {
  createdById: string;
  createdByName: string | null;
  createdByEmail: string | null;
  products: {
    productName: string;
    productPrice: number;
    productQuantity: number;
    totalPrice: number;
  }[];
  totalPriceInvoice: number;
}

export const generateInvoice = async (invoice: InvoiceType) => {
  try {
    const res = await api.post("/invoice/generate-pdf", invoice, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
