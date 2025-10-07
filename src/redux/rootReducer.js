// src/redux/rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import authReducer from "./slices/authSlice";


const rootReducer = combineReducers({
  cart: cartReducer, 
  auth: authReducer,
});

export default rootReducer;
