import { useAppDispatch } from "../../../core/redux/app/hooks";
import { getMyProfileQuery } from "../../user/getGetMyProfileQuery";
import { ResponseSearchAllFormsType } from "../../user/types/responseSearchAllForms";
import { adsQuery } from "../../vacancy/adsQuery";
import { ResponseAdsType } from "../types/responseAdsType";



export const useClearResultsqueryAds = () => {
  const dispatch = useAppDispatch()

  const clearListVacancy = () => {
    dispatch(
      adsQuery.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
        draft.results.length = 0;
      })
    );
  };

  const clearListAds = () => {
    dispatch(
      adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => {
        draft.results.length = 0;
      })
    );
  };

  const clearListAccount = () => {
    dispatch(
      getMyProfileQuery.util.updateQueryData("listAccount", undefined, (draft: ResponseSearchAllFormsType) => {
        draft.results.length = 0;
      })
    );
  };

  return { clearListVacancy, clearListAds, clearListAccount };
};
