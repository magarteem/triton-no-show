import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { LicenseType } from "./types/license";
import { ResetPasswordRequestType, ResetPasswordTokenRequestType } from "./types/resetPassword";
import { variableApiURL_SSO } from "../../api/variableApiURL";
import { LoginRequestType, LoginResponseType } from "../../types/SSO/loginResponseType";

export const authQuery = createApi({
 reducerPath: "authQuery",
 baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL_SSO}/${variableApiURL_SSO}`,
  prepareHeaders: async (headers) => {
   headers.set("accept", `application/json`);
   return headers;
  },
 }),
 keepUnusedDataFor: 60 * 60,

 endpoints: (build) => ({
  login: build.mutation<LoginResponseType, LoginRequestType>({
   query: (data) => {
    return {
     url: `auth/login`,
     method: "POST",
     body: data,
    };
   },
  }),

  requestResetPassword: build.mutation<void, ResetPasswordRequestType>({
   query: (mail) => ({
    url: `auth/request_reset_password`,
    method: "POST",
    body: mail,
   }),
  }),
  requestResetPasswordToken: build.mutation<void, ResetPasswordTokenRequestType>({
   query: (tokenPassword) => ({
    url: `auth/reset_password`,
    method: "POST",
    body: tokenPassword,
   }),
  }),
  license: build.query<LicenseType, void>({
   query: (id_ads) => {
    return {
     url: `license`,
    };
   },
  }),
 }),
});

export const {
 useLoginMutation,
 useRequestResetPasswordMutation,
 useRequestResetPasswordTokenMutation,
 useLicenseQuery,
} = authQuery;
