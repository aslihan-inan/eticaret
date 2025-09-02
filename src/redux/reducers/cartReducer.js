// src/redux/cartReducer.js
const initialState = {
  cart: []
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const TOGGLE_CHECKED = "TOGGLE_CHECKED";

// Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      const existingIndex = state.cart.findIndex(
        item => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        // Increase count if product already exists
        const updatedCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        // Add new product
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product }]
        };
      }
    }

    case REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== productId)
      };
    }

    case TOGGLE_CHECKED: {
      const productId = action.payload;
      const updatedCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, checked: !item.checked }
          : item
      );
      return { ...state, cart: updatedCart };
    }

    default:
      return state;
  }
}

// Action creators
export const addToCart = product => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = productId => ({ type: REMOVE_FROM_CART, payload: productId });
export const toggleChecked = productId => ({ type: TOGGLE_CHECKED, payload: productId });
