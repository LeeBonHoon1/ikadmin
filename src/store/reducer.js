import { combineReducers } from "redux";

import userSlice from "../slices/user";
import admissionSlice from "../slices/admission";
import groupSlice from "../slices/group";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  admission: admissionSlice.reducer,
  group: groupSlice.reducer,
});

export default rootReducer;
