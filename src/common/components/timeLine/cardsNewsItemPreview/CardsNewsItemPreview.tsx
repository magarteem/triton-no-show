import { useNewsOptionsLongMenu } from "../../../../modules/timeLine/hook/useNewsOptionsLongMenu";
import { NewsResultType } from "../../../../modules/timeLine/types/responseNewsType";
import { BodyCards } from "../bodyCards/BodyCards";
import { HeaderCardsNews } from "../headerCards/HeaderCardsNews";
import s from "./cardsNewsItemPreview.module.scss";

export interface CardsNewsItemPreviewType {
  itemDataNews: NewsResultType;
  myProfileKey: string[];
}

export const CardsNewsItemPreview = ({ itemDataNews, myProfileKey }: CardsNewsItemPreviewType) => {
  const options = useNewsOptionsLongMenu(itemDataNews, myProfileKey);

  return (
    <div className={s.cardsItemWrapp} key={itemDataNews.id}>
      <div className={s.customStyleA}>
        <HeaderCardsNews timeLinePost={itemDataNews} options={options} />
      </div>
      <BodyCards
        timeLinePost={itemDataNews}
        id_news={itemDataNews.id}
        date={new Date(itemDataNews.createdDate).getTime()}
      />
    </div>
  );
};
