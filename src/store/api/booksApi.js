import { reauthApi } from "./reauthApi";

const booksApi = reauthApi("books").injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => ({
        url: "/books",
        params,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
export { booksApi };
