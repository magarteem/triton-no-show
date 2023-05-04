import { useAppDispatch } from "../../../core/redux/app/hooks";
import { getMyProfileQuery } from "../../user/getGetMyProfileQuery";
import { adsQuery } from "../../vacancy/adsQuery";

export const useClearResultsqueryAds = () => {
 const dispatch = useAppDispatch();

 const clearListVacancy = () => {
  dispatch(adsQuery.util.resetApiState());
  //dispatch(
  // adsQuery.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
  //  draft.results.length = 0;
  //  draft.isNextPage = true;
  // })
  //);
 };

 const clearListAds = () => {
  dispatch(adsQuery.util.resetApiState());
  //dispatch(
  // adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => {
  //  draft.results.length = 0;
  //  draft.isNextPage = true;
  // })
  //);
 };

 const clearListAccount = () => {
  dispatch(getMyProfileQuery.util.resetApiState());
  //dispatch(
  // getMyProfileQuery.util.updateQueryData(
  //  "listAccount",
  //  undefined,
  //  (draft: ResponseSearchAllFormsType) => {
  //   draft.results.length = 0;
  //   draft.isNextPage = true;
  //   draft.currentPage = 0;
  //  }
  // )
  //);
 };

 return { clearListVacancy, clearListAds, clearListAccount };
};
