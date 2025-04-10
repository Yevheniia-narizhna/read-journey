import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { libraryReducer } from "./library/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: libraryReducer,
  },
});
