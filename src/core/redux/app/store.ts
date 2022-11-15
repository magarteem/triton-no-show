import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from '../../../modules/authorization/authSlice';
import adsSlice from '../../../modules/ads/adsSlice';
import userSlice from '../../../modules/user/userSlice';

export const store = configureStore({
  reducer: {
    authSliceReducer: authSlice,
    userSliceReducer: userSlice,
    adsSliceReducer: adsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
