"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodayTask = {
  _id: string;
  task: string;
  date: string;
  category: {
    name: string;
  };
  status: string;
};

type TodayTaskState = {
  todayTask: TodayTask[];
};

const initialState: TodayTaskState = {
  todayTask: [],
};

const todayTaskSlice = createSlice({
  name: "todayTask",
  initialState,
  reducers: {
    addTodayTask: (state, action: PayloadAction<TodayTask[]>) => {
      state.todayTask = action.payload;
    },
    deleteTodayTask: (state, action: PayloadAction<TodayTask[]>) => {
      state.todayTask = state.todayTask.filter(
        (todo) => todo._id !== action.payload._id
      );
    },
    updateTodayTask: (state, action: PayloadAction<TodayTask[]>) => {
      const updatedTodayTask = state.todayTask.map((todo) =>
        todo._id === action.payload?._id ? action.payload : todo
      );
      state.todayTask = updatedTodayTask;
    },
    emptyTodayTask: () => {
      return initialState;
    },
  },
});

export const {
  addTodayTask,
  deleteTodayTask,
  updateTodayTask,
  emptyTodayTask,
} = todayTaskSlice.actions;
export default todayTaskSlice.reducer;
export const selectCurrentTodayTask = (state: { todayTask: TodayTaskState }) =>
  state.todayTask.todayTask;
