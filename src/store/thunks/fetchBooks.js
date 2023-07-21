import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchBooks = createAsyncThunk("books/fetch", async (params) => {
  const response = await axios.get("http://localhost:3500/books", {
    params,
  });

  return response.data;
});

export { fetchBooks };
