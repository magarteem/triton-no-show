import { CardsLayoutItem } from "../../../layout/cardsLayoutItem/CardsLayoutItem";
import { HeaderCardsIncoming } from "../headerCardsIncoming/HeaderCardsIncoming";
import { RouteNames } from "../../../../core/router/RouteNames";
import { SkillsLayoutTools } from "../../profile/aboutProfile/skills/SkillsLayoutTools";
import { SkillsLayoutGenre } from "../../profile/aboutProfile/skills/SkillsLayoutGenre";
import { ButtonlActionApplication } from "../buttonlActionApplication/ButtonlActionApplication";
import { Link } from "react-router-dom";
import { dateDeclension } from "../../../../helpers/dateDeclension";
import { ResultIncomingTypeResponse } from "../../../../modules/notification/types/responseNotificationType";
import { useNotificationOptionsLongMenu } from "../../../../modules/notification/hook/useNotificationOptionsLongMenu";
import cn from "classnames";
import s from "./incomingNotification.module.scss";

interface IncomingNotificationCardsCardstType {
 x: ResultIncomingTypeResponse;
}

export const IncomingNotificationCards = ({ x }: IncomingNotificationCardsCardstType) => {
 const { createObjLongMenuMain } = useNotificationOptionsLongMenu();

 const link =
  x.type !== "Contact"
   ? `${
      x.announcement.announcementType === "Vacancy"
       ? RouteNames.ADS
       : RouteNames.ADS + "/" + RouteNames.ADS_LIST
     }/${x.announcement?.announcementId}`
   : `${RouteNames.OTHER_PROFILE_USER}/${x.triggerForm.formId}`;

 return (
  <CardsLayoutItem key={x.id}>
   <div className={cn(s.addGapStyle)}>
    <HeaderCardsIncoming
     key={x.id}
     x={x}
     notifikationOPtionsLongMenu={createObjLongMenuMain(x, "inc", link)}
    />

    <Link to={link} className={s.ads}>
     {x.announcement?.instruments.length > 0 && (
      <div className={s.reStyleImportant}>
       <SkillsLayoutTools skillsDataItem={x.announcement.instruments} skillsCategoryTitle="" />
      </div>
     )}

     {x?.announcement?.genres.length > 0 && (
      <div className={s.reStyleImportant}>
       <SkillsLayoutGenre skillsDataItem={x.announcement.genres} skillsCategoryTitle="" />
      </div>
     )}

     <div className={s.publicationDate}>{`Отправлена ${dateDeclension(
      new Date(x.announcement?.createdDate ?? x.triggerForm.createdDate).getTime()
     )}`}</div>
    </Link>

    <ButtonlActionApplication x={x} />
   </div>
  </CardsLayoutItem>
 );
};
