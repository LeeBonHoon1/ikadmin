import { combineReducers } from "redux";

import userSlice from "../slices/user";
import admissionSlice from "../slices/admission";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  admission: admissionSlice.reducer,
});

export default rootReducer;
