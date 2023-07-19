import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { variableApiURL_PROFILE } from "./variableApiURL";
import { getJsonParseLocalStorage } from "../helpers/getJsonParseLocalStorage";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../core/redux/app/store";
import { logout, tokenTst } from "../modules/authorization/authSlice";
import apiSSO from "./axiosConfigSSO";
import { clearError, setNewError } from "./errorStoreSlice";

const baseQuery = fetchBaseQuery({
 baseUrl: `${process.env.REACT_APP_API_URL_PROFILE}/${variableApiURL_PROFILE}`,
 credentials: "same-origin",
 prepareHeaders: async (headers, { getState }) => {
  //const store = getState() as RootState;
  //const token = store.authSliceReducer.token;
  const token = localStorage.getItem(`auth-token`);

  if (token) {
   headers.set("authorization", `Bearer ${token}`);
   headers.set("accept", `application/json`);
   headers.set("form_id", JSON.parse(getJsonParseLocalStorage()).id);
  }
  return headers;
 },
});

export const baseQueryWithReauth: BaseQueryFn<
 string | FetchArgs,
 unknown,
 FetchBaseQueryError
> = async (args, api, extraOptions) => {
 let result = await baseQuery(args, api, extraOptions);

 if (result?.error?.status === 401) {
  try {
   const refreshResult = await apiSSO.post(`auth/refresh_token`);
   //const refreshResult = await baseQuery("/refresh_token", api, extraOptions);

   if (refreshResult?.data) {
    localStorage.setItem("auth-token", `${refreshResult.data.token.value}`);
    const tokenStore = api.getState() as RootState;
    api.dispatch(tokenTst(tokenStore.authSliceReducer.token));

    result = await baseQuery(args, api, extraOptions);
   } else {
    api.dispatch(logout());
   }
  } catch (error) {
   api.dispatch(logout());
  }
 }

 if (result?.error) api.dispatch(setNewError(result.error.status));

 return result;
};
