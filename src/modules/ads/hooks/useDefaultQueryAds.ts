import { useAppDispatch } from "../../../core/redux/app/hooks";
import { getMyProfileQuery } from "../../user/getGetMyProfileQuery";
import { ResponseSearchAllFormsType } from "../../user/types/responseSearchAllForms";
import { adsQuery } from "../../vacancy/adsQuery";
import { ResponseAdsType } from "../types/responseAdsType";

const defaultDraft = (draft: ResponseAdsType | ResponseSearchAllFormsType) => {
  draft.pageCount = 1;
  draft.currentPage = 0;
  draft.results.length = 0;
};

export const useDefaultQueryAds = () => {
  const dispatch = useAppDispatch()

  const defaultListVacancy = () => {
    dispatch(adsQuery.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => defaultDraft(draft)));
  };
  const defaultListAds = () => {
    dispatch(adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => defaultDraft(draft)));
  };
  const defaultListAccount = () => {
    dispatch(getMyProfileQuery.util.updateQueryData("listAccount", undefined, (draft: ResponseSearchAllFormsType) => defaultDraft(draft)));
  };

  return { defaultListVacancy, defaultListAds, defaultListAccount };
};
