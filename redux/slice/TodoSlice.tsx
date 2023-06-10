"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  task: string;
  date: number;
  catg: string;
};

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
