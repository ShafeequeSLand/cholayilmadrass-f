import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../slices/authSlice.js";
import adminAuthSlice from "../slices/adminauthSlice.js";
import searchSlice from "../slices/searchSlice.js";
import { apiSlice } from "../slices/apiSlice.js";
import { apiSliceAdmin } from "../slices/apiSliceAdmin.js";

const store = configureStore({
  reducer: {
    auth: userAuthSlice,
    adminAuth: adminAuthSlice,
    searchUsers: searchSlice,
    [apiSlice.reducerPath]: [apiSliceAdmin.reducer,apiSlice.reducer],

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, 
});

export default store;
