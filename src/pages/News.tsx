import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../core/redux/app/hooks";
import { getNewsListQuery, useInfinityScrollNewsQuery } from "../modules/timeLine/getNewsListQuery";
import { FilterParamsRequestType } from "../modules/timeLine/types/FilterFormsTimeLineFieldsType";

export const News = () => {
 const dispatch = useAppDispatch();
 const myProfileKey = useAppSelector((state) => state.userSliceReducer.allMyForms);

 // const [pageCountCheck, setPageCountCheck] = useState(0);
 const [pageparams, setPageparams] = useState<FilterParamsRequestType>({
  page: 0,
 });

 const { data, isLoading, isFetching } = useInfinityScrollNewsQuery(pageparams);

 const refetchFu = () => {
  dispatch(getNewsListQuery.util.resetApiState());
  //pageCountCheck === 0 &&
  setPageparams({
   page: 0,
   query: undefined,
   type: undefined,
   cityIds: undefined,
   genreIds: undefined,
   instrumentIds: undefined,
  });
 };

 // useEffect(() => {
 //  data && setPageCountCheck(data.pageCount);
 // }, [data]);

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

 return (
  <Outlet context={[data?.results, isLoading, isFetching, setPageFu, refetchFu, myProfileKey]} />
 );
};
