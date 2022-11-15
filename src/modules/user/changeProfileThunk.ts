import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeProfileThunk = createAsyncThunk<
 string,
 any,
 { rejectValue: any }
>(
 `changeProfile/user`,
 async function (data, { rejectWithValue }) {
  try {
   console.log("th = ", data);
   return data;
  } catch (error) {
   return rejectWithValue("error");
  }
 }
);
