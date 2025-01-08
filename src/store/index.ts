import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./reducers/inventorySlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
