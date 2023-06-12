import { apiSlice } from "./apiSlice";

export const TodoByIdApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    todo: builder.query({
      query: ({ id }) => `/todo/${id}`,
      keepUnusedDataFor: 3,
    }),
  }),
});
export const { useTodoQuery } = TodoByIdApiSlice;
