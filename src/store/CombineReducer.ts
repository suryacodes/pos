import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./Reducer";

const reducers = combineReducers({
  [productSlice.name]: productSlice.reducer,
});

export default reducers;
