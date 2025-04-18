import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetAuth } from "./slice";

export const libraryApi = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await libraryApi.post("/users/signup", userData);

      if (res.status !== 201) {
        return rejectWithValue("Registration failed");
      }

      const { token, refreshToken } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("login response", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await libraryApi.post("/users/signin", userData);

      if (res.status !== 201) {
        return rejectWithValue("Login failed");
      }

      const { token, refreshToken } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Login response data:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Отримуємо токен з localStorage

      if (!token) {
        return rejectWithValue("No token found, user is not logged in");
      }

      const res = await libraryApi.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`, // Додаємо токен в заголовок
        },
      });

      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch user");
      }

      return res.data; // Повертаємо дані користувача
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found, unable to log out");
      }

      const res = await libraryApi.post(
        "/users/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен у заголовок
          },
        }
      );

      if (res.status !== 200) {
        return rejectWithValue("Sign out failed");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");

    // Перевірка на наявність токену
    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }

    try {
      const res = await libraryApi.get("/users/current/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // Додаємо токен до заголовку
        },
      });

      if (res.status !== 200) {
        return rejectWithValue("Failed to refresh tokens");
      }
      const { token, refreshToken } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const useAxiosInterceptor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = libraryApi.interceptors.response.use(
      (response) => response, // Пропуск відповіді без змін
      async (error) => {
        const originalRequest = error.config;

        // Якщо статус 401 і запит ще не повторювався
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            // Викликаємо оновлення токенів через dispatch
            const result = await dispatch(refreshTokens()).unwrap();
            const newToken = result.token; // Отримуємо новий токен

            // Оновлюємо заголовки з новим токеном
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            // Повторно виконуємо запит з новим токеном
            return libraryApi(originalRequest);
          } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            dispatch(resetAuth());

            window.location.href = "/login";

            return Promise.reject(err);
          }
        }

        // Якщо це не 401 або ми вже повторили запит, повертаємо помилку
        return Promise.reject(error);
      }
    );

    // Не забувайте очистити інтерсептор, коли компонент відмонтовано
    return () => {
      libraryApi.interceptors.response.eject(interceptor);
    };
  }, [dispatch]); // Залежність від dispatch
};
