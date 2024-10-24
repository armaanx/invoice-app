import { createSlice } from "@reduxjs/toolkit";

interface PdfState {
  pdf: Blob | null;
}

const initialState: PdfState = {
  pdf: null,
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setPdf: (state, action) => {
      state.pdf = action.payload;
    },
    clearPdf: (state) => {
      state.pdf = null;
    },
  },
});

export const { setPdf, clearPdf } = pdfSlice.actions;

export default pdfSlice.reducer;
