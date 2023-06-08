import { RouteNames } from "../../../../core/router/RouteNames";
import { reSelectData } from "../../../../modules/notification/helpers/reSelect";
import { useNotificationOptionsLongMenu } from "../../../../modules/notification/hook/useNotificationOptionsLongMenu";
import { ResultOutcomingTypeResponse } from "../../../../modules/notification/types/responseNotificationType";
import { AdsLayoutItem } from "../../../layout/adsLayoutItem/AdsLayoutItem";
import { AnnouncementCard } from "../../ads/announcementCard/AnnouncementCard";
import { WaitingActionButton } from "../waitinActionButton/WaitingActionButton";

interface OutgoingNotificationCardstType {
 x: ResultOutcomingTypeResponse;
}

export const OutgoingNotificationCards = ({ x }: OutgoingNotificationCardstType) => {
 const { createObjLongMenuMain } = useNotificationOptionsLongMenu();

 const link =
  x.type !== "Contact"
   ? `${
      x.announcement && x.announcement.announcementType === "Vacancy"
       ? RouteNames.ONE_VACANCY
       : RouteNames.ONE_ANNOUNCEMENT
     }/${x.announcement?.announcementId}`
   : `${RouteNames.OTHER_PROFILE_USER}/${x.requestedForm.formId}`;

 return (
  <AdsLayoutItem key={x.id}>
   <AnnouncementCard
    x={reSelectData(x)}
    link={link}
    notifikationOPtionsLongMenu={createObjLongMenuMain(x, "out", link)}
   />

   <WaitingActionButton status={x.status} userTargetIdForm={x.requestedForm.formId} />
  </AdsLayoutItem>
 );
};
