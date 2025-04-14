import { createSlice } from "@reduxjs/toolkit";
import {
  addBookToLibrary,
  getRecommendedBooks,
  getUserBooks,
} from "./operations";

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
        // state.page = action.payload.page;
        state.perPage = action.payload.perPage;
      })
      .addCase(getRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error";
      })
      .addCase(addBookToLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        const newBook = action.payload;
        state.items = [...state.items, newBook];
      })
      .addCase(addBookToLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add book to library";
      })
      .addCase(getUserBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results; // В залежності від вашого API
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(getUserBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch books";
      });
  },
});
export const libraryReducer = booksSlice.reducer;
