import { createAsyncThunk } from "@reduxjs/toolkit";
import { libraryApi } from "../auth/operations";

// export const getRecommendedBooks = createAsyncThunk(
//   "books/getRecommendedBooks",
//   async ({ title = "", author = "" }, { rejectWithValue }) => {
//     try {
//       // Отримуємо токен з localStorage
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return rejectWithValue("No token found. Please log in.");
//       }

//       // Відправляємо запит із токеном у заголовках
//       const response = await libraryApi.get("/books/recommend", {
//         params: { title, author },
//         headers: {
//           Authorization: `Bearer ${token}`, // додаємо токен у заголовок
//         },
//       });

//       if (response.status !== 200) {
//         return rejectWithValue("Failed to fetch recommended books");
//       }

//       return response.data; // { results, totalPages, page, perPage }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
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

      if (response.status !== 200) {
        return rejectWithValue("Failed to add book to library");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserBooks = createAsyncThunk(
  "books/getUserBooks",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await libraryApi.get("/books/own", {
        params: { page, limit: 10 }, // Параметри фільтрації та пагінації
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue("Failed to fetch user books");
      }

      return response.data; // Очікується, що повернеться масив книг
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
