import { useOutletContext } from "react-router-dom";
import { ResponseOutgoingType } from "../../../../modules/notification/types/responseNotificationType";
import { InButton } from "../../../ui-elements/button/InButton";
import { OutgoingNotificationCards } from "./OutgoingNotificationCards";
import s from "../incomingNotification/incomingNotification.module.scss";

interface OutletType {
  dataOutgoing: ResponseOutgoingType;
}

export const OutgoingNotification = () => {
  const { dataOutgoing }: OutletType = useOutletContext();

  return (
    <div className={s.hiddenAnimationLeft}>
      {dataOutgoing?.results.length === 0 && (
        <InButton textButton="Вы ещё не откликались" isValidInButton={false} />
      )}
      {dataOutgoing?.results?.map((x) => {
        return <OutgoingNotificationCards x={x} key={x.id} />;
      })}
    </div>
  );
};
