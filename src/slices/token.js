import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};
const tokenSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: {},
});

export default tokenSlice;
