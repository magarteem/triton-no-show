import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/app/hooks";
import { RouteNames } from "../../../../core/router/RouteNames";
import { CircularProgress } from "@mui/material";

import {
 ResponseAdsType,
 ResultAdsTypeResponse,
} from "../../../../modules/ads/types/responseAdsType";
import {
 notificationQuery,
 useSendAnnouncementReplyMutation,
 useSendVacancyReplyMutation,
} from "../../../../modules/notification/notificationQuery";
import { EnumAnnouncementStatus } from "../../../../types/PROFILE/enum/EnumAnnouncementStatus";
import { AdsLayoutItem } from "../../../layout/adsLayoutItem/AdsLayoutItem";
import { ButtonSubmitMui } from "../../../mui-element/ButtonSubmitMui";
import { WaitingActionButton } from "../../notification/waitinActionButton/WaitingActionButton";
import { AnnouncementCard } from "../announcementCard/AnnouncementCard";
import { adsQuery } from "../../../../modules/vacancy/adsQuery";
import { CheckMyHaveAccountContext } from "../../../../contextProvider/CheckHaveAccountContext";
import { adsQueryVacancy } from "../../../../modules/vacancy/adsQueryVacancy";
import s from "./announcementFeed.module.scss";

interface AnnouncementFeedType {
 x: ResultAdsTypeResponse;
}

export const AnnouncementFeed = ({ x }: AnnouncementFeedType) => {
 const dispatch = useAppDispatch();
 const { notHaveForms, handleOpen }: any = useContext(CheckMyHaveAccountContext);
 const { isActiveForms: idMyFormStore, allMyForms } = useAppSelector(
  (state) => state.userSliceReducer
 );
 const idMyForm = JSON.parse(idMyFormStore).id;
 let location = useLocation().pathname;

 const subscribeAds = (key: boolean) => {
  dispatch(notificationQuery.util.resetApiState());
  dispatch(
   key
    ? adsQueryVacancy.util.updateQueryData("listVacancy", undefined, (draft: ResponseAdsType) => {
       return {
        ...draft,
        results: draft.results.map((y) => {
         if (y.id === x.id) {
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
         if (y.id === x.id) {
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

 const [
  sendVacancyReply,
  { isSuccess: isSuccessVacancy, isLoading: isLoadingVacancy, isError: isErrorVacancy },
 ] = useSendVacancyReplyMutation();
 const [
  sendAnnouncementReply,
  { isSuccess: isSuccessAds, isLoading: isLoadingAds, isError: isErrorAds },
 ] = useSendAnnouncementReplyMutation();

 const respondAds = (idPost: string) => {
  if (notHaveForms) {
   handleOpen();
   return;
  }

  if (location === `${RouteNames.ADS}`) {
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

 const checkTypeAds = x.jobDocument === null || x.jobDocument;

 return (
  <div className={s.listAds} key={x.id}>
   <AdsLayoutItem>
    <AnnouncementCard
     x={x}
     link={
      checkTypeAds
       ? `${RouteNames.ADS}/${RouteNames.ADS_LIST}/${x.id}`
       : `${RouteNames.ADS}/${x.id}`
     }
    />

    {isErrorVacancy || isErrorAds ? (
     <div className={s.respond}>
      <ButtonSubmitMui
       onClick={() => respondAds(x.id)}
       isValidInButton={false}
       textButton="Ошибка, повторить"
      />
     </div>
    ) : isLoadingVacancy || isLoadingAds ? (
     <div className={s.loading}>
      <CircularProgress size={30} />
     </div>
    ) : isSuccessAds || isSuccessVacancy ? (
     <div className={s.respond}>
      <ButtonSubmitMui isValidInButton={true} textButton="Ожидание ответа" />
     </div>
    ) : (
     !allMyForms.includes(x.form.formId) &&
     (x.announcementStatusResponse === EnumAnnouncementStatus.NO_REPLY ? (
      <div className={s.respond}>
       <ButtonSubmitMui
        onClick={() => respondAds(x.id)}
        isValidInButton={false}
        textButton="Откликнуться"
       />
      </div>
     ) : (
      <WaitingActionButton status={x.announcementStatusResponse} userTargetIdForm={x.form.formId} />
     ))
    )}
   </AdsLayoutItem>
  </div>
 );
};
