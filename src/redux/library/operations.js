import { createAsyncThunk } from "@reduxjs/toolkit";
import { libraryApi } from "../auth/operations";

export const getRecommendedBooks = createAsyncThunk(
  "books/getRecommendedBooks",
  async ({ title = "", author = "", page }, { rejectWithValue }) => {
    try {
      const response = await libraryApi.get("/books/recommend", {
        params: { title, author, page, limit: 10 }, // Параметри фільтрації та пагінації
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue("Failed to fetch recommended books");
      }

      return response.data; // { results, totalPages, page, perPage }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBookToLibrary = createAsyncThunk(
  "books/addBookToLibrary",
  async (id, { rejectWithValue }) => {
    try {
      const response = await libraryApi.post(
        `/books/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status !== 201) {
        return rejectWithValue("Failed to add book to library");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewBook = createAsyncThunk(
  "books/addBookToLibrary",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await libraryApi.post("/books/add", bookData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserBooks = createAsyncThunk(
  "books/getUserBooks",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token is missing");
        return;
      }

      const response = await libraryApi.get("/books/own", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserBook = createAsyncThunk(
  "books/deleteUserBook",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log("Token before delete request:", token);
    try {
      const response = await libraryApi.delete(`/books/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue("Failed to delete book");
      }

      return response.data.id; // { message, id }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const startReading = createAsyncThunk(
  "books/startReading",
  async ({ id, page }, { rejectWithValue }) => {
    try {
      const { data } = await libraryApi.post(
        `/books/reading/start`,
        { id, page },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const stopReading = createAsyncThunk(
  "books/stopReading",
  async ({ id, page }, { rejectWithValue }) => {
    try {
      const { data } = await libraryApi.post(
        `/books/reading/finish`,
        { id, page },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "book/fetchBookDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await libraryApi.get(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteReading = createAsyncThunk(
  "books/deleteReading",
  async ({ bookId, entryId }, thunkAPI) => {
    try {
      const response = await libraryApi.delete("/books/reading", {
        params: { bookId, readingId: entryId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete reading"
      );
    }
  }
);
