import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalPrice: number;
}

interface ProductsState {
  products: Product[];
  totalPrice: number;
}

const initialState: ProductsState = {
  products: [],
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product.productName === action.payload.productName
      );
      if (!existingProduct) {
        state.products.push(action.payload);
        state.totalPrice += action.payload.totalPrice;
      }
    },
    resetProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
