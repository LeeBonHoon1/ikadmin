import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
});
export default store;

export const useAppDispatch = () => useDispatch();
