import { configureStore } from "@reduxjs/toolkit";
import { setCredentials, logOut, authReducer } from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { booksApi } from "./api/booksApi";
import { cartApi } from "./api/cartApi";
import { booksReducer } from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    loginStatus: authReducer,
    booksApi: booksReducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(booksApi.middleware)
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);

export { store, setCredentials, logOut, authReducer };

export * from "./thunks/fetchBooks";

export {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} from "./api/authApi";

export { useGetBooksQuery } from "./api/booksApi";

export {
  useGetCartQuery,
  useAddToCartMutation,
  useAddOrderMutation,
  useGetOrdersQuery,
} from "./api/cartApi";
