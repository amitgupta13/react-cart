import { reauthApi } from "./reauthApi";

const booksApi = reauthApi("books").injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      providesTags: ["Books"],
      query: (params) => {
        return {
          url: "/books",
          params,
          method: "GET",
        };
      },
    }),
    addRating: builder.mutation({
      invalidatesTags: ["Books"],
      query: (body) => ({
        url: "/books/ratings",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddRatingMutation } = booksApi;
export { booksApi };
