import { combineReducers } from "redux";

import userSlice from "../slices/user";
import admissionSlice from "../slices/admission";
import groupSlice from "../slices/group";
import tokenSlice from "../slices/token";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  admission: admissionSlice.reducer,
  group: groupSlice.reducer,
  token: tokenSlice.reducer,
});

export default rootReducer;
