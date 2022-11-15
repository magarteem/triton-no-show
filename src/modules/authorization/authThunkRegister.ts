import { createAsyncThunk } from "@reduxjs/toolkit";

export const authThunkRegister = createAsyncThunk<
 any,
 any,
 { rejectValue: any }
>(
 `authorization/sign-Up`,
 async function (data, { rejectWithValue }) {
  try {
   return data;
  } catch (error) {
   return rejectWithValue("error");
  }
 }
);
