import { combineReducers } from "redux";
import { appSlice } from "./appReducer";
import { RootState } from "./interfaces";

const rootReducer = combineReducers<RootState>({
  app: appSlice.reducer,
});

export default rootReducer;
