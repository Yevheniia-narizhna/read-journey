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
    shouldRedirectToLogin: false,
  },
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
    clearRedirectToLogin: (state) => {
      state.shouldRedirectToLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shouldRedirectToLogin = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.shouldRedirectToLogin = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.shouldRedirectToLogin = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shouldRedirectToLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.shouldRedirectToLogin = false;
        // localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.shouldRedirectToLogin = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shouldRedirectToLogin = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.shouldRedirectToLogin = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.shouldRedirectToLogin = false;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.shouldRedirectToLogin = false;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.error = action.payload;
        state.shouldRedirectToLogin = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        state.shouldRedirectToLogin = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.shouldRedirectToLogin = false;
      });
  },
});
export const { resetAuth, clearRedirectToLogin } = authSlice.actions;
export const selectShouldRedirectToLogin = (state) =>
  state.auth.shouldRedirectToLogin;

export const authReducer = authSlice.reducer;
