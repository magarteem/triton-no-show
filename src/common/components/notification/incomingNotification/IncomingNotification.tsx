import { CardsLayoutItem } from "../../../layout/cardsLayoutItem/CardsLayoutItem";
import { SkillsLayoutTools } from "../../profile/aboutProfile/skills/SkillsLayoutTools";
import { SkillsLayoutGenre } from "../../profile/aboutProfile/skills/SkillsLayoutGenre";
import { ButtonlActionApplication } from "../buttonlActionApplication/ButtonlActionApplication";
import { dateDeclension } from "../../../../helpers/dateDeclension";
import { HeaderCardsIncoming } from "../headerCardsIncoming/HeaderCardsIncoming";
import { Link, useOutletContext } from "react-router-dom";
import {
 ResponseIncomingType,
 ResultIncomingTypeResponse,
} from "../../../../modules/notification/types/responseNotificationType";
import { InButton } from "../../../ui-elements/button/InButton";
import s from "./incomingNotification.module.scss";
import cn from "classnames";
import { memo } from "react";
import { RouteNames } from "../../../../core/router/RouteNames";

export const IncomingNotification = memo(() => {
 const [, , dataIncoming, isLoadingIncoming]: [
  undefined,
  undefined,
  ResponseIncomingType,
  boolean
 ] = useOutletContext();

 if (isLoadingIncoming) return null;

 return (
  <div className={s.hiddenAnimationRight}>
   {dataIncoming.results.length === 0 && (
    <InButton textButton="Нет подписчиков" isValidInButton={false} />
   )}
   {dataIncoming.results.map((x: ResultIncomingTypeResponse) => (
    <CardsLayoutItem key={x.id}>
     <div className={cn(s.addGapStyle)}>
      <HeaderCardsIncoming key={x.id} x={x} />

      <Link
       to={
        x.type !== "Contact"
         ? `${
            x.announcement.announcementType === "Vacancy"
             ? RouteNames.ADS
             : RouteNames.ADS + "/" + RouteNames.ADS_LIST
           }/${x.announcement?.announcementId}`
         : `${RouteNames.OTHER_PROFILE_USER}/${x.triggerForm.formId}`
       }
       className={s.ads}
      >
       {x.announcement?.instruments.length > 0 && (
        <div className={s.yreStyleImportant}>
         <SkillsLayoutTools skillsDataItem={x.announcement.instruments} skillsCategoryTitle="" />
        </div>
       )}

       {x?.announcement?.genres.length > 0 && (
        <div className={s.reStyleImportant}>
         <SkillsLayoutGenre skillsDataItem={x.announcement.genres} skillsCategoryTitle="" />
        </div>
       )}

       <div className={s.publicationDate}>{`Отправлена ${dateDeclension(
        new Date(x.announcement?.createdDate).getTime()
       )}`}</div>
      </Link>

      <ButtonlActionApplication x={x} />
     </div>
    </CardsLayoutItem>
   ))}
  </div>
 );
});

//export const IncomingNotification = memo(() => {
// const [, , dataIncoming, isLoadingIncoming]: [
//  undefined,
//  undefined,
//  ResponseIncomingType,
//  boolean
// ] = useOutletContext();

// if (isLoadingIncoming) return null;

// return (
//  <div className={s.hiddenAnimationRight}>
//   {dataIncoming.results.length === 0 && (
//    <InButton textButton="Нет подписчиков" isValidInButton={false} />
//   )}
//   {dataIncoming.results.map((x: ResultIncomingTypeResponse) => (
//    <CardsLayoutItem key={x.id}>
//     <div className={cn(s.addGapStyle)}>
//      <HeaderCardsIncoming key={x.id} x={x} />

//      {x.triggerForm?.instruments.length > 0 && (
//       <div className={s.reStyleImportant}>
//        <SkillsLayoutTools skillsDataItem={x.triggerForm.instruments} skillsCategoryTitle="" />
//       </div>
//      )}

//      {x?.triggerForm?.genres.length > 0 && (
//       <div className={s.reStyleImportant}>
//        <SkillsLayoutGenre skillsDataItem={x.triggerForm.genres} skillsCategoryTitle="" />
//       </div>
//      )}

//      <div className={s.publicationDate}>{`Отправлена ${dateDeclension(
//       new Date(x.announcement?.createdDate).getTime()
//      )}`}</div>

//      <ButtonlActionApplication x={x} />
//     </div>
//    </CardsLayoutItem>
//   ))}
//  </div>
// );
//});
