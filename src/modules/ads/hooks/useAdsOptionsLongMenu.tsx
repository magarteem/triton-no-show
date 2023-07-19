import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../core/redux/app/hooks";
import { RouteNames } from "../../../core/router/RouteNames";
import { getThisPageURL } from "../../../helpers/getThisPageURL";
import { useDeleteAdsMutation } from "../../vacancy/adsQuery";
import { ResultAdsTypeResponse } from "../types/responseAdsType";
import { OptionLongMenuType } from "../../../common/mui-element/LongMenu";
import { useDeleteVacancyMutation } from "../../vacancy/adsQueryVacancy";

export const useAdsOptionsLongMenu = (data: ResultAdsTypeResponse | undefined) => {
 const { allMyForms } = useAppSelector((state) => state.userSliceReducer);
 const [deleteVacancy] = useDeleteVacancyMutation();
 const [deleteAds] = useDeleteAdsMutation();

 const deleteThisADS = () => {
  if (data) {
   data.conditions ? deleteVacancy(data.id) : deleteAds(data.id);
  }
 };

 const complain = () => (window.location.href = "mailto:support@3-tone.ru");
 const changeThisNews = () => <Navigate to={RouteNames.CHANGE_THIS_NEWS} />;

 let options: OptionLongMenuType[] = [
  {
   label: "Скопировать ссылку",
   link: "",
   action: () => getThisPageURL(data?.id),
  },
 ];

 if (data && allMyForms.includes(data.form.formId)) {
  options = [
   {
    label: "Редактировать",
    link: `${RouteNames.ADS}/${
     data.hasOwnProperty("jobDocument")
      ? RouteNames.ADS_CHANGE_THIS_ADS_ANNOUNCEMENT
      : RouteNames.ADS_CHANGE_THIS_ADS
    }/${data.id}`,
    action: changeThisNews,
   },
   {
    label: "Удалить",
    link: data.conditions ? RouteNames.ADS : `${RouteNames.ADS}/${RouteNames.ADS_LIST}`,
    action: deleteThisADS,
   },
   ...options,
  ];
 } else {
  options = [
   ...options,
   {
    label: "Пожаловаться",
    link: "",
    action: complain,
   },
  ];
 }

 return options;
};
