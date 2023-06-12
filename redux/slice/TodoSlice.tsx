"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  _id: string;
  task: string;
  date: string;
  catg: string;
  status: string;
};

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    removeTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
    },
    updateTodoWithId: (state, action: PayloadAction<Todo[]>) => {
      const updatedTodo = state.todos.map((todo) =>
        todo._id === action.payload?._id ? action.payload : todo
      );
      state.todos = updatedTodo
    },
    emptyTodo: () => {
      return initialState;
    },
  },
});

export const { addTodo, removeTodo, updateTodoWithId, emptyTodo } = todoSlice.actions;
export default todoSlice.reducer;
export const selectCurrentTodos = (state: { todos: TodosState }) =>
  state.todos.todos;
