import { useOutletContext } from "react-router-dom";
import { ResponseIncomingType } from "../../../../modules/notification/types/responseNotificationType";
import { InButton } from "../../../ui-elements/button/InButton";
import { memo } from "react";
import { IncomingNotificationCards } from "./IncomingNotificationCards";
import s from "./incomingNotification.module.scss";

interface OutletType {
 dataIncoming: ResponseIncomingType;
}

export const IncomingNotification = memo(() => {
 const { dataIncoming }: OutletType = useOutletContext();

 return (
  <div className={s.hiddenAnimationRight}>
   {dataIncoming.results.length === 0 && (
    <InButton textButton="Нет подписчиков" isValidInButton={false} />
   )}
   {dataIncoming.results.map((x) => (
    <IncomingNotificationCards x={x} key={x.id} />
   ))}
  </div>
 );
});
