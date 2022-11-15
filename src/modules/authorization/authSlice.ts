import {
 createSlice,
 PayloadAction,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { InitialStateType } from "../../core/redux/types/authSliceType";
import { authThunkLogin } from "./authThunkLogin";

const initialState: InitialStateType = {
 isAuth: !!Cookies.get("auth-token"),
 error: null,
};

const authSlice = createSlice({
 name: "authSlice",
 initialState,

 reducers: {
  logout(state: InitialStateType) {
   Cookies.remove("auth-token");
   state.isAuth = false;
  },
 },

 extraReducers: (builder) => {
  builder
   .addCase(
    authThunkLogin.pending.type,
    (state: InitialStateType) => {}
   )
   .addCase(
    authThunkLogin.fulfilled.type,
    (
     state: InitialStateType,
     actions: PayloadAction<string>
    ) => {
     Cookies.set("auth-token", `${actions.payload}`);
     state.isAuth = !!actions.payload;
    }
   )
   .addCase(
    authThunkLogin.rejected.type,
    (
     state: InitialStateType,
     actions: PayloadAction<string>
    ) => {
     console.log("authThunkLogin");
    }
   );
 },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
