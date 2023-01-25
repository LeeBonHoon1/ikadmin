import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../lib/APIs";

const initialState = {
  isLoading: false,
  admission: "",
  email: "",
  name: "",
  number: "",
  sortation: 0,
  userIdx: 0,
};

export const fetchHome = createAsyncThunk(
  "home/fetchHome",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getUserList();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);
const admissionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHome.pending.type]: (state, action) => {
      state.isLoaded = true;
    },
    [fetchHome.fulfilled.type]: (state, action) => {
      const { payload } = action;

      state.data = payload;
      state.isLoaded = false;
    },
    [fetchHome.rejected.type]: (state, action) => {
      state.isLoaded = false;
    },
  },
});

export const {} = admissionSlice.actions;

export default admissionSlice;
