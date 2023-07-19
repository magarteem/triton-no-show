import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateErrorStoreSliceType {
 checkError: boolean;
 errStatus: string | number | null;
}

const initialState: InitialStateErrorStoreSliceType = {
 checkError: false,
 errStatus: null,
};

const errorStoreSlice = createSlice({
 name: "errorStoreSlice",
 initialState,

 reducers: {
  setNewError(state: InitialStateErrorStoreSliceType, actions: PayloadAction<number | string>) {
   state.checkError = true;
   state.errStatus = actions.payload;
  },
  clearError(state: InitialStateErrorStoreSliceType) {
   state.checkError = false;
   state.errStatus = null;
  },
 },
});

export const { setNewError, clearError } = errorStoreSlice.actions;
export default errorStoreSlice.reducer;
