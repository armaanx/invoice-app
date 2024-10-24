import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productsReducer from "./products/productSlice";
import pdfReducer from "./pdf/pdfSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    pdf: pdfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
