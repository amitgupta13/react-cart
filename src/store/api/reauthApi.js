import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  prepareHeaders(headers, { getState }) {
    const token = getState().auth.token || localStorage.getItem("accessToken");
    if (token) headers.set("x-auth-token", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const refreshToken = localStorage.getItem("refreshToken");
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 && refreshToken) {
    const refreshResult = await baseQuery(
      {
        url: "/users/token",
        method: "POST",
        body: {
          token: refreshToken,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      localStorage.setItem("refreshToken", refreshResult?.data?.refreshToken);
      localStorage.setItem("accessToken", refreshResult?.data?.accessToken);
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const reauthApi = (reducerPath) =>
  createApi({
    reducerPath,
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
  });
