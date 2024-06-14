import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reduces";

const store = configureStore({
  reducer: mainReducer,
});

export default store;
