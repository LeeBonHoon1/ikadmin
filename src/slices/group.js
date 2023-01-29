import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../lib/APIs";

const initialState = {
  isLoading: false,
  group: [],
};

export const fetchGroup = createAsyncThunk(
  "home/fetchGroup",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getGroupList();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGroup.pending.type]: (state, action) => {
      state.isLoaded = true;
    },
    [fetchGroup.fulfilled.type]: (state, action) => {
      const { payload } = action;

      state.data = payload;
      state.isLoaded = false;
    },
    [fetchGroup.rejected.type]: (state, action) => {
      state.isLoaded = false;
    },
  },
});

export const {} = groupSlice.actions;

export default groupSlice;
