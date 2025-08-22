import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
