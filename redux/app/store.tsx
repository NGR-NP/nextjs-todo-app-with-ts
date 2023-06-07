import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slice/TodoSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({}).concat(todosReducer.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
