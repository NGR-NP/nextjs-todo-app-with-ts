import { apiSlice } from "./apiSlice";

export const CountTotalTodoOfAllCatgApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    countTodo: builder.query({
      query: () => "/catg/count",
      keepUnusedDataFor: 3,
    }),
  }),
});
export const { useCountTodoQuery } = CountTotalTodoOfAllCatgApiSlice;
