// reducers/index.js

/** root reducer */
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { placeReducer } from "../PlaceReducer";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.
const rootReducer = combineReducers({
  placeReducer,
});
export const store = configureStore({ reducer: rootReducer });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
