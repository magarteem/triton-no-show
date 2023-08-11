import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import apiProfile from "../../api/axiosConfigPROFILE";
import { getJsonParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { RequestVacancyType } from "../ads/types/requestAdsType";
import { ResponseAdsType, ResultAdsTypeResponse } from "../ads/types/responseAdsType";
import { VacancyFilterParamsRequestType } from "./types/FilterFormsAdsFieldsType";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";
import { baseQueryWithReauth } from "../../api/baseQuery";

export const adsQueryVacancy = createApi({
 reducerPath: "adsQueryVacancy",
 baseQuery: baseQueryWithReauth,
 tagTypes: ["VACANCY"],
 keepUnusedDataFor: 60 * 60,

 endpoints: (build) => ({
  listVacancy: build.query<ResponseAdsType, VacancyFilterParamsRequestType | void | null>({
   query: (arg) => {
    console.log("listAds V arg = ", arg);
    const params = {
     page: arg?.page ?? 0,
     pageSize: 10,
     query: !!arg?.query ? arg.query : undefined,
     formId: arg?.formId,
     vacancyOwnerFormType: arg?.vacancyOwnerFormType,
     searchVacancyDocumentType: arg?.searchVacancyDocumentType,
     institutionTypeId: arg?.institutionTypeId,
     cityIds: arg?.cityIds ?? undefined,
     genreIds: arg?.genreIds,
     gender: arg?.gender,
     ageStart: arg?.fromAge ?? undefined,
     ageEnd: arg?.toAge ?? undefined,
     teamType: arg?.teamTypes ?? undefined,
     master: arg?.master, //пока не реализовано на бэке
     instrumentIds: arg?.instrumentIds,
     currentUserFormId:
      JSON.parse(getJsonParseLocalStorage()).id ?? "00000000-0000-0000-0000-000000000000",
    };

    return {
     url: `vacancy/search?${queryString.stringify(params)}`,
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

  sendVacancyPost: build.mutation<string, RequestVacancyType>({
   query: (arg) => ({
    url: `vacancy`,
    method: "POST",
    body: arg,
   }),

   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    try {
     const { data: createData } = await queryFulfilled;
     //@ts-ignore
     apiProfile(`vacancy/${createData.id}`).then((res: AxiosResponse<ResultAdsTypeResponse>) => {
      dispatch(
       adsQueryVacancy.util.updateQueryData(
        "listVacancy",
        //@ts-ignore
        res,
        (draft: ResponseAdsType) => {
         draft.results?.unshift(res.data);
        }
       )
      );
     });
    } catch {
     console.log("error vel");
    }
   },
  }),

  updateThisVacancyPost: build.mutation<
   string,
   { data: RequestVacancyType; change_id_ads: string }
  >({
   invalidatesTags: ["VACANCY"],
   query: ({ data, change_id_ads }) => {
    return {
     url: `vacancy/${change_id_ads}`,
     method: "PUT",
     body: data,
    };
   },

   async onQueryStarted(m, { dispatch, queryFulfilled }) {
    try {
     const { data: createData } = await queryFulfilled;
     apiProfile(
      //@ts-ignore
      `vacancy/${createData.id}`
     ).then((res: AxiosResponse<ResultAdsTypeResponse>) => {
      dispatch(
       adsQueryVacancy.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
        draft.results = draft.results?.map((x) => {
         if (x.id === m.change_id_ads) {
          return res.data;
         } else {
          return x;
         }
        });
       })
      );
     });
    } catch {
     console.log("Error");
    }
   },
  }),

  oneVacancyPost: build.query<ResultAdsTypeResponse, string>({
   providesTags: ["VACANCY"],
   query: (id_ads) => {
    return {
     url: `vacancy/${id_ads}`,
     params: {
      currentUserFormId: JSON.parse(getJsonParseLocalStorage()).id,
     },
    };
   },
  }),

  deleteVacancy: build.mutation<void, string>({
   query: (string) => ({
    url: `vacancy/archive/${string}`,
    method: "PUT",
   }),

   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    try {
     await queryFulfilled;
     dispatch(
      adsQueryVacancy.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
       let r = draft.results?.filter((x) => x.id !== id);
       return { ...draft, results: r };
      })
     );
    } catch {
     console.log("Error");
    }
   },
  }),
 }),
});

export const {
 useListVacancyQuery,
 useSendVacancyPostMutation,
 useOneVacancyPostQuery,
 useDeleteVacancyMutation,
 useUpdateThisVacancyPostMutation,
} = adsQueryVacancy;
