import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignInFormValues } from "./types/type";

export const authThunkLogin = createAsyncThunk<
  string,
  ISignInFormValues,
  { rejectValue: any }
>(`authorization/sign-In`, async function (data, { rejectWithValue }) {
  try {
    return JSON.stringify(data)
  } catch (error) {
    return rejectWithValue("error");
  }
});
