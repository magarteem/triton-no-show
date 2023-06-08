import { RouteNames } from "../../../core/router/RouteNames";
import { getThisPageURL } from "../../../helpers/getThisPageURL";
import { useDeleteNewsMutation } from "../getNewsListQuery";
import { NewsResultType } from "../types/responseNewsType";

interface OptionLongMenuType {
 label: string;
 link: string;
 action: () => void;
}

export const useNewsOptionsLongMenu = (
 dataNews: NewsResultType | undefined,
 myProfileKey: string[]
) => {
 const [deleteNews] = useDeleteNewsMutation();
 const complain = () =>
  (window.location.href = `mailto:${process.env.REACT_APP_API_URL_SUPPORT_MAIL}`);

 const deleteThisNews = () => {
  dataNews?.id && deleteNews(dataNews?.id);
 };

 let options: OptionLongMenuType[] = [
  {
   label: "Скопировать ссылку",
   link: "",
   action: () => getThisPageURL(dataNews?.id),
  },
 ];

 if (dataNews && myProfileKey.includes(dataNews.form.formId)) {
  options = [
   ...options,
   {
    label: "Удалить",
    link: RouteNames.NEWS,
    action: deleteThisNews,
   },
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
