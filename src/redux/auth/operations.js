import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

      if (res.status !== 200) {
        return rejectWithValue("Login failed");
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
