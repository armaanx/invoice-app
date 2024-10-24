import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useToast } from "@/hooks/use-toast";
import { addProduct } from "@/redux/products/productSlice";
import { AddProductsFormSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DataTable } from "./AddProductsPageTable/DataTable";
import { columns } from "./AddProductsPageTable/columns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { generateInvoice, InvoiceType } from "@/lib/invoiceUtils";
import { setPdf } from "@/redux/pdf/pdfSlice";

const AddProductsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);
  const { products, totalPrice } = useAppSelector((state) => state.products);
  const form = useForm<z.infer<typeof AddProductsFormSchema>>({
    resolver: zodResolver(AddProductsFormSchema),
    defaultValues: {
      productName: "",
      productPrice: "",
      productQuantity: "",
    },
  });
  function onSubmit(values: z.infer<typeof AddProductsFormSchema>) {
    const newProduct = {
      productName:
        values.productName[0].toUpperCase() + values.productName.slice(1),
      productPrice: Number(values.productPrice),
      productQuantity: Number(values.productQuantity),
      totalPrice: Number(values.productPrice) * Number(values.productQuantity),
    };
    if (
      products.find((product) => product.productName === values.productName)
    ) {
      toast.toast({
        title: "Product with the same name already exists",
        variant: "destructive",
      });
      return;
    }
    dispatch(addProduct(newProduct));
  }

  async function handleGenerate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      toast.toast({ title: "Generating Invoice..." });
      const payload: InvoiceType = {
        createdById: userId!,
        createdByName: null,
        createdByEmail: null,
        products,
        totalPriceInvoice: totalPrice,
      };
      const pdf = await generateInvoice(payload);
      dispatch(setPdf(pdf));
      navigate("/invoice");
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-start justify-start relative overflow-hidden pt-32 pb-12 antialiased px-6 md:px-12 xl:px-3 w-full">
      <div className="absolute w-[400px] h-[400px] bg-[#6a61ebdd] rounded-full blur-[90px] opacity-25 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="w-full max-w-7xl mx-auto space-y-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Add Products
        </h1>
        <p className="text-zinc-300">Enter Product Details</p>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-2 md:gap-5 lg:gap-8 gap-y-8 items-center justify-center mt-5 text-nowrap"
          >
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-zinc-200">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the product name"
                      {...field}
                      className="bg-zinc-800/50 border-zinc-700 text-white py-7 rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-200">Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price"
                      {...field}
                      className="bg-zinc-800/50 border-zinc-700 text-white py-7 rounded-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-200">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the Qty"
                      {...field}
                      className="bg-zinc-800/50 border-zinc-700 text-white py-7 rounded-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-stone-800 hover:text-lime-600 text-lime-500 w-fit"
              size={"lg"}
            >
              Add Product
              <CirclePlus className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </Form>
      </div>
      <div className="container w-full text-white max-w-7xl mx-auto mt-10 flex flex-col gap-5 items-center justify-center">
        <div className="w-full">
          <DataTable
            columns={columns}
            data={products}
            totalPrice={totalPrice + totalPrice * 0.18}
          />
        </div>
        <Button
          disabled={products.length === 0}
          className="bg-stone-800 hover:text-lime-600 text-lime-500 w-fit"
          size={"lg"}
          onClick={handleGenerate}
        >
          Generate PDF Invoice
        </Button>
      </div>
      <div className="w-full mx-auto max-w-7xl"></div>
    </div>
  );
};

export default AddProductsPage;
