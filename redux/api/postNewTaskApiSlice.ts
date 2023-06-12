import { apiSlice } from "./apiSlice";

export const newTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      newTask: builder.mutation({
        query: credentials => ({
          url: "/todo",
          method: "POST",
          body: { ...credentials },
        }),
      }),
    }),
  });
  export const { useNewTaskMutation } = newTaskApiSlice;
