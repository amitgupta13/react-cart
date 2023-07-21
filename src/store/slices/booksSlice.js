import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../thunks/fetchBooks";

const booksSlice = createSlice({
  name: "booksApi",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const booksReducer = booksSlice.reducer;
