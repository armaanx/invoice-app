import { ColumnDef } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import { Product } from "../AddProductsPage";
import { Button } from "../ui/button";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-semibold text-base px-4 hover:bg-white"
        >
          Product Name
          {column.getIsSorted() === "asc" ? (
            <MoveDown className="ml-2 h-4 w-4" />
          ) : (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-4 p-1">{row.getValue("productName")}</div>;
    },
  },
  {
    accessorKey: "productPrice",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-semibold text-base hover:bg-white"
          variant={"ghost"}
        >
          Product Price
          {column.getIsSorted() === "asc" ? (
            <MoveDown className="ml-2 h-4 w-4" />
          ) : (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-4 p-1">{row.getValue("productPrice")}</div>;
    },
  },
  {
    accessorKey: "productQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-semibold text-base hover:bg-white"
        >
          Product Quantity
          {column.getIsSorted() === "asc" ? (
            <MoveDown className="ml-2 h-4 w-4" />
          ) : (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-4 p-1">{row.getValue("productQuantity")}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => (
      <div className="text-base font-semibold text-black">Total Price</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="px-4 p-1">
          {"INR" + " " + row.getValue("totalPrice")}
        </div>
      );
    },
  },
];
