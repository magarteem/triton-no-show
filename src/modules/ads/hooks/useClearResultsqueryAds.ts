import { useAppDispatch } from "../../../core/redux/app/hooks";
import { getMyProfileQuery } from "../../user/getGetMyProfileQuery";
import { adsQuery } from "../../vacancy/adsQuery";
import { adsQueryVacancy } from "../../vacancy/adsQueryVacancy";

export const useClearResultsqueryAds = () => {
 const dispatch = useAppDispatch();

 const clearListAdsPost = () => dispatch(adsQuery.util.resetApiState());
 const clearListVacancyPost = () => dispatch(adsQueryVacancy.util.resetApiState());
 const clearListAccount = () => dispatch(getMyProfileQuery.util.resetApiState());

 return { clearListVacancyPost, clearListAdsPost, clearListAccount };
};
