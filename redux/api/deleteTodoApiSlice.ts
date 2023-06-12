import { apiSlice } from "./apiSlice";

export const DeleteTodoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTodo: builder.mutation({
      query: (credentials) => ({
        url: `/todo`,
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useDeleteTodoMutation } = DeleteTodoApiSlice;
