import { createSlice } from "@reduxjs/toolkit";
import { getRecommendedBooks } from "./operations";

const initialState = {
  items: [],
  totalPages: 0,
  page: 1,
  perPage: 0,
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
      })
      .addCase(getRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});
export const libraryReducer = booksSlice.reducer;
