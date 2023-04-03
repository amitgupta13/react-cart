import { reauthApi } from "./reauthApi";

export const authApi = reauthApi("auth").injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: "/users/token",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/users/logout",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApi;
