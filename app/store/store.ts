import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "./user/user.api";
import { userReducer } from "./user/user.slice";

export const store = configureStore({
  reducer: { [userApi.reducerPath]: userApi.reducer, users: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      userApi.middleware
    ),
});

export type TypeRootState = ReturnType<typeof store.getState>;
