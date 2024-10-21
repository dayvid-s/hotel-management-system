import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./features/authSlice";
import { GuestReducer } from "./features/guestSlice";
import { LogReducer } from "./features/logSlice";
import { RoomReducer } from "./features/roomSlice";
import { ServiceRequestReducer } from "./features/serviceRequestSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    room: RoomReducer,
    guest: GuestReducer,
    log: LogReducer,
    serviceRequest: ServiceRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
