import queryString from "query-string";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { getJsonParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { ResponseAdsType } from "../ads/types/responseAdsType";
import { ResponseNewsType } from "../timeLine/types/responseNewsType";
import { MusicianTypeResponse } from "./types/putReqestUpdateMyForm";
import { AllFormsType } from "./types/responseSearchAllForms";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";
import { baseQueryWithReauth } from "../../api/baseQuery";

export const otherUserDataQuery = createApi({
  reducerPath: "otherUserDataQuery",
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    //! NEWS
    otherUserNews: build.query<ResponseNewsType, { page: number; formId: string }>({
      query: ({ page, formId }) => {
        const params = {
          page: page,
          pageSize: 5,
          formId: formId,
        };

        return {
          url: `news/search?${queryString.stringify(params)}`,
        };
      },

      forceRefetch({ currentArg, previousArg, endpointState }) {
        return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.currentPage = newItems.currentPage;
        currentCache.isNextPage = newItems.isNextPage;
        currentCache.results.push(...newItems.results);
      },
    }),

    //! VACANCY
    otherUserVacancy: build.query<ResponseAdsType, { page: number; formId: string }>({
      query: ({ page, formId }) => {
        const params = {
          page: page,
          pageSize: 5,
          formId: formId,
          currentUserFormId:
            JSON.parse(getJsonParseLocalStorage()).id ?? "00000000-0000-0000-0000-000000000000",
        };

        return {
          url: `vacancy/search?${queryString.stringify(params)}`,
        };
      },

      forceRefetch({ currentArg, previousArg, endpointState }) {
        return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.currentPage = newItems.currentPage;
        currentCache.isNextPage = newItems.isNextPage;
        currentCache.results.push(...newItems.results);
      },
    }),

    //! ADS
    otherUserAnnouncement: build.query<ResponseAdsType, { page: number; formId: string }>({
      query: ({ page, formId }) => {
        const params = {
          page: page,
          pageSize: 5,
          formId: formId,
          currentUserFormId:
            JSON.parse(getJsonParseLocalStorage()).id ?? "00000000-0000-0000-0000-000000000000",
        };

        return {
          url: `announcement/search?${queryString.stringify(params)}`,
        };
      },

      forceRefetch({ currentArg, previousArg, endpointState }) {
        return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.currentPage = newItems.currentPage;
        currentCache.isNextPage = newItems.isNextPage;
        currentCache.results.push(...newItems.results);
      },
    }),

    //! HIS ACCOUNT ???
    getByUser: build.query<AllFormsType[] | any, string>({
      query: (get_by_user_Id) => {
        return {
          url: `form/get_by_user/${get_by_user_Id}`,
        };
      },

      transformResponse: (response: any) => {
        const m = response.map((x: any) => Object.values(x));
        const allForms: MusicianTypeResponse[] = [].concat(...m);

        return allForms.map((x) => {
          const allFormsReStructure = {
            formId: x.id,
            tritoneUserId: x.tritoneUserId,
            name: x.document.name,
            avatar: x.avatar,
            city: x.document.city ?? null,
            birthday: x.document.birthday,
            instruments: x.instruments ?? [],
            genres: x.genres ?? [],
            contactRequestStatus: x.contactRequestStatus,
            formType: "MusicShop",
            createdDate: "2023-03-24T06:46:11.702596Z",
          };
          return allFormsReStructure;
        });
      },
    }),
  }),
});

export const { } = otherUserDataQuery;
