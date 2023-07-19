import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import apiProfile from "../../api/axiosConfigPROFILE";
import { getJsonParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { RequestAdsType } from "../ads/types/requestAdsType";
import { ResponseAdsType, ResultAdsTypeResponse } from "../ads/types/responseAdsType";
import { AdsFilterParamsRequestType } from "./types/FilterFormsAdsFieldsType";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";
import { baseQueryWithReauth } from "../../api/baseQuery";

export const adsQuery = createApi({
 reducerPath: "adsQuery",
 baseQuery: baseQueryWithReauth,
 tagTypes: ["ADS"],
 keepUnusedDataFor: 60 * 60,

 endpoints: (build) => ({
  listAds: build.query<ResponseAdsType, AdsFilterParamsRequestType | void | null>({
   query: (arg) => {
    //console.log("listAds arg = ", arg);
    const params = {
     page: arg?.page ?? 0,
     pageSize: 10,
     searchAnnouncementDocumentType: arg?.searchAnnouncementDocumentType,
     cityIds: arg?.cityIds ?? undefined,
     genreIds: arg?.genreIds,
     instrumentIds: arg?.instrumentIds,
     query: !!arg?.query ? arg.query : undefined,
     formId: arg?.formId,
     formTypes: arg?.formTypes,
     teamTypes: arg?.teamTypes,
     institutionTypeIds: arg?.institutionTypeIds,
     neededEmployeeTypes: arg?.neededEmployeeTypes,
     musicianTypes: arg?.musicianTypes,
     currentUserFormId:
      JSON.parse(getJsonParseLocalStorage()).id ?? "00000000-0000-0000-0000-000000000000",
    };

    return {
     url: `announcement/search?${queryString.stringify(params)}`,
    };
   },

   serializeQueryArgs: ({ endpointName }) => {
    return endpointName;
   },

   merge: (currentCache, newItems) => {
    currentCache.currentPage = newItems.currentPage;
    currentCache.isNextPage = newItems.isNextPage;
    currentCache.results.push(...newItems.results);
   },

   forceRefetch({ currentArg, previousArg, endpointState }) {
    return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
   },
  }),

  sendAdsPost: build.mutation<string, RequestAdsType>({
   query: (arg) => ({
    url: `announcement`,
    method: "POST",
    body: arg,
   }),

   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    try {
     const { data: createData } = await queryFulfilled;
     //@ts-ignore
     apiProfile(`announcement/${createData.id}`).then(
      (res: AxiosResponse<ResultAdsTypeResponse>) => {
       dispatch(
        adsQuery.util.updateQueryData(
         "listAds",
         //@ts-ignore
         res,
         (draft: ResponseAdsType) => {
          draft.results?.unshift(res.data);
         }
        )
       );
      }
     );
    } catch {
     console.log("error vel");
    }
   },
  }),

  updateThisAdsPost: build.mutation<string, { data: RequestAdsType; change_id_ads: string }>({
   query: ({ data, change_id_ads }) => ({
    url: `announcement/${change_id_ads}`,
    method: "PUT",
    body: data,
   }),
   invalidatesTags: ["ADS"],
   async onQueryStarted(m, { dispatch, queryFulfilled }) {
    try {
     const { data: createData } = await queryFulfilled;
     apiProfile(
      //@ts-ignore
      `announcement/${createData.id}`
     ).then((res: AxiosResponse<ResultAdsTypeResponse>) => {
      dispatch(
       adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => {
        const n = draft.results?.map((x) => {
         if (x.id === m.change_id_ads) {
          return res.data;
         } else {
          return x;
         }
        });
        draft.results = n;
       })
      );
     });
    } catch {
     console.log("Error");
    }
   },
  }),

  oneAnnouncementPost: build.query<ResultAdsTypeResponse, string>({
   query: (id_ads) => {
    return {
     url: `announcement/${id_ads}`,
     params: {
      currentUserFormId: JSON.parse(getJsonParseLocalStorage()).id,
     },
    };
   },
   providesTags: ["ADS"],
  }),

  deleteAds: build.mutation<void, string>({
   query: (string) => ({
    url: `announcement/archive/${string}`,
    method: "PUT",
   }),

   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    try {
     await queryFulfilled;
     dispatch(
      adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => {
       let r = draft.results?.filter((x) => x.id !== id);
       return { ...draft, results: r };
      })
     );
    } catch {
     console.log("Error ");
    }
   },
  }),
 }),
});

export const {
 useListAdsQuery,
 useSendAdsPostMutation,
 useOneAnnouncementPostQuery,
 useDeleteAdsMutation,
 useUpdateThisAdsPostMutation,
} = adsQuery;
