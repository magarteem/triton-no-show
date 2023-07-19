import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/app/hooks";
import { RouteNames } from "../../../../core/router/RouteNames";
import { CircularProgress } from "@mui/material";
import {
 notificationQuery,
 useSendAnnouncementReplyMutation,
 useSendVacancyReplyMutation,
} from "../../../../modules/notification/notificationQuery";
import { AnnouncementStatusResponseType } from "../../../../types/PROFILE/accountMainGlobalType";
import { EnumAnnouncementStatus } from "../../../../types/PROFILE/enum/EnumAnnouncementStatus";
import { ButtonSubmitMui } from "../../../mui-element/ButtonSubmitMui";
import { WaitingActionButton } from "../../notification/waitinActionButton/WaitingActionButton";
import { ResponseAdsType } from "../../../../modules/ads/types/responseAdsType";
import { adsQuery } from "../../../../modules/vacancy/adsQuery";
import s from "./respondButton.module.scss";
import { CheckMyHaveAccountContext } from "../../../../contextProvider/CheckHaveAccountContext";
import { adsQueryVacancy } from "../../../../modules/vacancy/adsQueryVacancy";

interface RespondButtonType {
 idPost: string;
 autorThisPost: string;
 statusAds: AnnouncementStatusResponseType;
 refetch: () => void;
}

export const RespondButton = ({ idPost, autorThisPost, statusAds, refetch }: RespondButtonType) => {
 const myForm = useAppSelector((state) => state.userSliceReducer.isActiveForms);
 const { notHaveForms, handleOpen }: any = useContext(CheckMyHaveAccountContext);
 const idMyForm = JSON.parse(myForm).id;
 let { pathname } = useLocation();
 const { id_ads } = useParams();
 const dispatch = useAppDispatch();

 const [
  sendVacancyReply,
  { isSuccess: isSuccessVacancy, isLoading: isLoadingVacancy, isError: isErrorVacancy },
 ] = useSendVacancyReplyMutation();

 const [
  sendAnnouncementReply,
  { isSuccess: isSuccessAds, isLoading: isLoadingAds, isError: isErrorAds },
 ] = useSendAnnouncementReplyMutation();

 const subscribeAds = (key: boolean) => {
  refetch();
  dispatch(notificationQuery.util.resetApiState());
  dispatch(
   key
    ? adsQueryVacancy.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
       return {
        ...draft,
        results: draft.results.map((y) => {
         if (y.id === id_ads) {
          return {
           ...y,
           announcementStatusResponse: EnumAnnouncementStatus.PENDING,
          };
         } else return y;
        }),
       };
      })
    : adsQuery.util.updateQueryData("listAds", undefined, (draft: ResponseAdsType) => {
       return {
        ...draft,
        results: draft.results.map((y) => {
         if (y.id === id_ads) {
          return {
           ...y,
           announcementStatusResponse: EnumAnnouncementStatus.PENDING,
          };
         } else return y;
        }),
       };
      })
  );
 };

 const respondAds = () => {
  if (notHaveForms) {
   handleOpen();
   return;
  }

  if (pathname === `${RouteNames.ADS}/${id_ads}`) {
   sendVacancyReply({
    idPost,
    idMyForm,
   })
    .unwrap()
    .then(() => subscribeAds(true));
  } else {
   sendAnnouncementReply({
    idPost,
    idMyForm,
   })
    .unwrap()
    .then(() => subscribeAds(false));
  }
 };

 return (
  <div className={s.respond}>
   {isSuccessAds || isSuccessVacancy ? (
    <ButtonSubmitMui isValidInButton={true} textButton="Ожидание ответа" />
   ) : isLoadingVacancy || isLoadingAds ? (
    <div className={s.loading}>
     <CircularProgress size={30} />
    </div>
   ) : isErrorVacancy || isErrorAds ? (
    <ButtonSubmitMui
     onClick={() => respondAds}
     isValidInButton={false}
     textButton="Ошибка, повторить"
    />
   ) : statusAds === EnumAnnouncementStatus.NO_REPLY ? (
    <ButtonSubmitMui onClick={respondAds} isValidInButton={false} textButton="Откликнуться" />
   ) : (
    <WaitingActionButton status={statusAds} userTargetIdForm={autorThisPost} />
   )}
  </div>
 );
};
