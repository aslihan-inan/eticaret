import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cart.find(item => item.product.id === action.payload.id);
      if (exists) {
        exists.count += 1;
      } else {
        state.cart.push({ product: action.payload, count: 1, checked: true });
      }
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
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(i => i.product.id !== action.payload);
    }
  }
});

export const { addToCart, increaseCount, decreaseCount, toggleChecked, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
