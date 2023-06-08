import { OptionLongMenuType } from "../../../common/mui-element/LongMenu";
import { ResultAdsTypeResponse } from "../../ads/types/responseAdsType";
import { ResultOutcomingTypeResponse } from "../types/responseNotificationType";

export const useNotificationOptionsLongMenu = () => {
 const complain = () => (window.location.href = "mailto:support@3-tone.ru");

 const getThisPageURL = (type: "Contact" | "AnnouncementReply", url?: string | undefined) => {
  const URL =
   url && type === "Contact"
    ? window.location.href.replace("/notification", "") + url
    : type === "AnnouncementReply"
    ? window.location.href + "/" + url
    : window.location.href;
  navigator.clipboard.writeText(URL);
 };

 const getThisPageURLIncoming = (
  type: "Contact" | "AnnouncementReply",
  url?: string | undefined
 ) => {
  const URL =
   url && (type === "Contact" || type === "AnnouncementReply")
    ? window.location.href.replace("/notification/incoming", "") + url
    : window.location.href;
  navigator.clipboard.writeText(URL);
 };

 const createObjLongMenuMain = (
  data: ResultOutcomingTypeResponse | ResultAdsTypeResponse | any,
  key: "out" | "inc",
  url?: string
 ) => {
  let options: OptionLongMenuType[] = [
   {
    label: "Скопировать ссылку",
    link: "",
    action: () => {
     if (key === "out") return getThisPageURL(data.type, url);
     else return getThisPageURLIncoming(data.type, url);
    },
   },
   {
    label: "Пожаловаться",
    link: "",
    action: complain,
   },
  ];
  return options;
 };

 return { createObjLongMenuMain };
};
