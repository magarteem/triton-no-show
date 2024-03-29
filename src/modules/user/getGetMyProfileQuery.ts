import { createApi } from "@reduxjs/toolkit/dist/query/react";
import queryString from "query-string";
import { doneParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { PortfolioType } from "../../types/PROFILE/accountMainGlobalType";
import { GenreGlobalType } from "../../types/PROFILE/genreGlobalType";
import { FilterSearchAllFormsType } from "./types/filterSearchAllFormsType";
import { ResponseSearchAllFormsType } from "./types/responseSearchAllForms";
import { ProfileDataApiDataType } from "./types/userSliceType";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";
import { baseQueryWithReauth } from "../../api/baseQuery";

export const getMyProfileQuery = createApi({
 reducerPath: "getMyProfileQuery",
 baseQuery: baseQueryWithReauth,

 endpoints: (build) => ({
  getMyProfileDataQuery: build.query<GenreGlobalType[], void>({
   query: () => ({
    url: "form/my",
   }),
  }),

  sendPortfolioImg: build.mutation<
   PortfolioType[],
   { formDataImg: FormData | string; profileId: string }
  >({
   query: (payload) => ({
    url: `form/profile/${payload.profileId}`,
    method: "POST",
    body: payload.formDataImg,
   }),
  }),

  getOtherUserProfileForID: build.query<ProfileDataApiDataType, string>({
   query: (id_user) => ({
    url: `form/${id_user}`,
    params: {
     requestFormId: doneParseLocalStorage.id,
    },
   }),
  }),

  changeAvatar: build.mutation<
   PortfolioType,
   { formDataImg: FormData | string; profileId: string }
  >({
   query: (payload) => ({
    url: `form/avatar/${payload.profileId}`,
    method: "POST",
    body: payload.formDataImg,
   }),
  }),

  listAccount: build.query<ResponseSearchAllFormsType, FilterSearchAllFormsType | void | null>({
   query: (arg) => {
    const params = {
     page: arg?.page ?? 0,
     pageSize: 10,
     query: !!arg?.query ? arg.query : undefined,
     formType: arg?.formType, //?? "Musician",
     cityId: arg?.cityIds ?? undefined,
     institutionTypeId: arg?.institutionTypeId,
     genreIds: arg?.genreIds,
     instrumentIds: arg?.instrumentIds,
     gender: arg?.gender ?? undefined, // ?? "Male",
     ageStart: arg?.ageStart ?? undefined,
     ageEnd: arg?.ageEnd ?? undefined,
     teamType: arg?.teamTypes ?? undefined,
     master: arg?.master, //пока не реализовано на бэке
    };

    return {
     url: `form/search?${queryString.stringify(params)}`,
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

  //! request_contacts_by_form =  send \ accept \ decline
  requestContactsByForm: build.mutation<any, { idPost: string; idMyForm: string }>({
   query: ({ idMyForm, idPost }) => {
    return {
     url: `form/${idPost}/request_contacts_by_form/${idMyForm}`,
     method: "POST",
    };
   },
  }),
  //! accept_contacts_request_by_form =  send \ accept \ decline
  acceptContactsByForm: build.mutation<any, { idPost: string; idMyForm: string }>({
   query: ({ idMyForm, idPost }) => {
    return {
     url: `form/${idPost}/accept_contacts_request_by_form/${idMyForm}`,
     method: "PUT",
    };
   },
  }),
  //! decline_contacts_request_by_form =  send \ accept \ decline
  declinetContactsByForm: build.mutation<any, { idPost: string; idMyForm: string }>({
   query: ({ idMyForm, idPost }) => {
    return {
     url: `form/${idPost}/decline_contacts_request_by_form/${idMyForm}`,
     method: "PUT",
    };
   },
  }),
 }),
});

export const {
 useGetMyProfileDataQueryQuery,
 useSendPortfolioImgMutation,
 useChangeAvatarMutation,
 useGetOtherUserProfileForIDQuery,
 useListAccountQuery,
 useRequestContactsByFormMutation,
 useAcceptContactsByFormMutation,
 useDeclinetContactsByFormMutation,
} = getMyProfileQuery;
