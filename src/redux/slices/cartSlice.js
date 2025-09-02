// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cart.find(item => item.product.id === action.payload.id);
      if (existing) {
        existing.count += 1; // ürün varsa sayısını artır
      } else {
        state.cart.push({ product: action.payload, count: 1, checked: true }); // yoksa ekle ve checked default true
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.product.id !== action.payload);
    },
    increaseCount: (state, action) => {
      const item = state.cart.find(i => i.product.id === action.payload);
      if (item) item.count += 1;
    },
    decreaseCount: (state, action) => {
      const item = state.cart.find(i => i.product.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },
    toggleChecked: (state, action) => {
      const item = state.cart.find(i => i.product.id === action.payload);
      if (item) item.checked = !item.checked;
    },
  },
});

export const { addToCart, removeFromCart, increaseCount, decreaseCount, toggleChecked } = cartSlice.actions;
export default cartSlice.reducer;
