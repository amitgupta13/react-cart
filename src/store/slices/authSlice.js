import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "loginStatus",
  initialState: { accessToken: null, refreshToken: null, isLoggedIn: false },
  reducers: {
    setCredentials(state, action) {
      const { refreshToken, accessToken } = action.payload;
      state.refreshToken = refreshToken;
      state.accessToken = accessToken;
      state.isLoggedIn = true;
    },
    logOut(state, action) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
