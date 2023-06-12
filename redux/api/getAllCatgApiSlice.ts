import { apiSlice } from "./apiSlice";

export const getAllCatgApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatg: builder.query({
      query: () => "/catg",
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useLazyGetAllCatgQuery } = getAllCatgApiSlice;
