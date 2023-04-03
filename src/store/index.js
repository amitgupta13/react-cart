import { configureStore } from "@reduxjs/toolkit";
import { setCredentials, logOut, authReducer } from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";

const store = configureStore({
  reducer: {
    loginStatus: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export { store, setCredentials, logOut, authReducer };

export {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} from "./api/authApi";
