import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PwaVersionType } from "./pwaVersionType";
import { variableApiURL_SSO } from "../../api/variableApiURL";

export const pwaVersionQuery = createApi({
 reducerPath: "pwaVersionQuery",
 baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL_SSO}/${variableApiURL_SSO.slice(0, 4)}`,
 }),

 endpoints: (build) => ({
  pwaVersionApp: build.query<PwaVersionType[], void>({
   query: (id_ads) => {
    return {
     url: `system/api_versions`,
    };
   },
  }),
 }),
});

export const { usePwaVersionAppQuery } = pwaVersionQuery;
