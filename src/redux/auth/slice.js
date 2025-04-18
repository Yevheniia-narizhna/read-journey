import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  loginUser,
  refreshTokens,
  registerUser,
  signOutUser,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
