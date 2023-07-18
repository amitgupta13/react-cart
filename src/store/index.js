import { configureStore } from "@reduxjs/toolkit";
import { setCredentials, logOut, authReducer } from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { booksApi } from "./api/booksApi";

const store = configureStore({
  reducer: {
    loginStatus: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(booksApi.middleware),
});

setupListeners(store.dispatch);

export { store, setCredentials, logOut, authReducer };

export {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} from "./api/authApi";

export { useGetBooksQuery } from "./api/booksApi";
