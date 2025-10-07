// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice"; // varsa auth için ekle

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // varsa ekle
    // başka slice'lar eklenecekse buraya
  },
});

export default store;
