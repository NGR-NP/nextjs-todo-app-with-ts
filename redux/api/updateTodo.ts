import { apiSlice } from "./apiSlice";

export const UpdateTodoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTodo: builder.mutation({
      query: credentials => ({
        url: `/todo`,
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useUpdateTodoMutation } = UpdateTodoApiSlice;
