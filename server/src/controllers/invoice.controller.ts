import { IInvoice, Invoice } from "../models/invoice.model.ts";
import { invoiceSchema } from "../schema/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { generateInvoice } from "../utils/invoiceGenerator.ts";

export const generatePdf = asyncHandler(async (req: Request, res: Response) => {
  try {
    invoiceSchema.parse(req.body);
    const incomingInvoice = req.body as IInvoice;
    const { createdById, products, totalPriceInvoice } = incomingInvoice;
    const user = await User.findById(createdById).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const invoice = await Invoice.create({
      createdById,
      createdByEmail: user.email,
      createdByName: user.name,
      products,
      totalPriceInvoice,
    });
    if (!invoice) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    //generate pdf

    const pdfBuffer = await generateInvoice(invoice, {
      email: user.email,
      name: user.name,
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoice._id}.pdf`
    );

    // Send both PDF and invoice data
    // We need to use res.write() and res.end() to send both binary and JSON data
    res.write(pdfBuffer);
    res.end();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.issues[0].message });
    } else if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
});
