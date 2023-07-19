import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../core/redux/app/hooks";
import { getNewsListQuery, useInfinityScrollNewsQuery } from "../modules/timeLine/getNewsListQuery";
import { FilterParamsRequestType } from "../modules/timeLine/types/FilterFormsTimeLineFieldsType";

export const News = () => {
 const dispatch = useAppDispatch();
 const myProfileKey = useAppSelector((state) => state.userSliceReducer.allMyForms);
 const [filterON, setfilterON] = useState(false);
 const [pageparams, setPageparams] = useState<FilterParamsRequestType>({
  page: 0,
 });

 const { data, isLoading, isFetching, originalArgs } = useInfinityScrollNewsQuery(pageparams);
 const refetchFu = () => {
  dispatch(getNewsListQuery.util.resetApiState());
  setPageparams({
   page: 0,
   query: undefined,
   type: undefined,
   cityIds: undefined,
   genreIds: undefined,
   instrumentIds: undefined,
  });
 };

 const setPageFu = (params: FilterParamsRequestType) => {
  if (params) {
   setPageparams({
    ...params,
    page: params.page,
   });
  } else {
   setPageparams({
    ...pageparams,
    page: data ? data.currentPage + 1 : 0,
   });
  }
 };

 useEffect(() => {
  return () => {
   // reset filer after return this pages if filter is active
   if (filterON) dispatch(getNewsListQuery.util.resetApiState());
  };
 }, [filterON]);

 return (
  <Outlet
   context={{
    data: data?.results,
    isLoading,
    isFetching,
    setPageFu,
    refetchFu,
    myProfileKey,
    originalArgs,
    filterON,
    setfilterON,
   }}
  />
 );
};
