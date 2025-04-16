import { createSlice } from "@reduxjs/toolkit";
import {
  addBookToLibrary,
  deleteUserBook,
  fetchBookDetails,
  getRecommendedBooks,
  getUserBooks,
  startReading,
  stopReading,
} from "./operations";

const initialState = {
  items: [],
  id: null,
  book: null,
  totalPages: 0,
  page: 1,
  perPage: 0,
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBookId: (state, action) => {
      state.id = action.payload;
    },
  },
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
        state.items = action.payload; // В залежності від вашого API
        // state.totalPages = action.payload.totalPages;
        // state.page = action.payload.page;
      })
      .addCase(getUserBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch books";
      })
      .addCase(deleteUserBook.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (book) => book._id !== action.payload.id
        );
      })
      .addCase(startReading.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.isLoading = false;
        // оновлюємо книгу в списку
        const index = state.items.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(startReading.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(stopReading.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(stopReading.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        console.log("Fetched book:", action.payload);
        state.isLoading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setBookId } = booksSlice.actions;
export const libraryReducer = booksSlice.reducer;
