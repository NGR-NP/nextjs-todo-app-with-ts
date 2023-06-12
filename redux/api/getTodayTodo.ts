import { apiSlice } from "./apiSlice";

export const TodayTaskAPiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    todayTask: builder.query({
      query: () => "/todo/today",
      keepUnusedDataFor: 3,
    }),
  }),
});
export const { useTodayTaskQuery } = TodayTaskAPiSlice;
