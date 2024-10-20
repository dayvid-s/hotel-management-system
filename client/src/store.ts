import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./features/authSlice";
import { RoomReducer } from "./features/roomSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    room: RoomReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
