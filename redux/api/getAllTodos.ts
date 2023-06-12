import { apiSlice } from "./apiSlice";

export const GetAllTodoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTodo: builder.query({
      query: () => `/todo`,
      keepUnusedDataFor: 3,
    }),
  }),
});
export const { useAllTodoQuery } = GetAllTodoApiSlice;
