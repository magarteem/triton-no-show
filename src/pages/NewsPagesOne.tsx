import { useOutletContext, useParams } from "react-router-dom";
//import moreButtonCircle from "../assets/icons/more-button-circle.svg";
import { ReactComponent as MoreButtonCircle } from "../assets/icons/more-button-circle.svg";
//import arrow_back from "../assets/icons/arrow_back.svg";
import { ReactComponent as ArrowBack } from "../assets/icons/arrow_back.svg";
//import shareIcons from "../assets/icons/shareIcons.svg";
import { ReactComponent as ShareIcons } from "../assets/icons/shareIcons.svg";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { LongMenu } from "../common/mui-element/LongMenu";
import { HeaderCardsNews } from "../common/components/timeLine/headerCards/HeaderCardsNews";
import { ChipsGenreItem } from "../common/ui-elements/chips/ChipsGenreItem";
import { ChipsToolItem } from "../common/ui-elements/chips/ChipsToolItem";
import { useOneNewsQuery } from "../modules/timeLine/getNewsListQuery";
import { selectTypeNews } from "../modules/timeLine/service/optionСategoryBD";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { useNewsOptionsLongMenu } from "../modules/timeLine/hook/useNewsOptionsLongMenu";
import s from "./styles/newsPagesOne.module.scss";

interface OutletType {
 myProfileKey: string[];
}

export const NewsPagesOne = () => {
 const { id_news } = useParams();
 const { data: dataNews } = useOneNewsQuery(id_news ?? "");
 const { myProfileKey }: OutletType = useOutletContext();

 const options = useNewsOptionsLongMenu(dataNews, myProfileKey);
 const objectSkills = dataNews && [...dataNews.genres, ...dataNews.instruments];

 return (
  <StylesFullScreen>
   <HeaderStylesWrapper
    cancelImgIcon={<ArrowBack />}
    textLabel="Новость"
    share={<ShareIcons />}
    tsxElement={<LongMenu moreButtonCircle={<MoreButtonCircle />} options={options} />}
   />
   {!dataNews ? (
    <PreLoader />
   ) : (
    <section className={s.timeline}>
     {<HeaderCardsNews menu={false} timeLinePost={dataNews} />}

     <div className={s.bodyNews}>
      {dataNews.attachments.map((elem: any, index: number) => (
       <img key={index} src={elem.uri} alt={elem.name} />
      ))}

      <pre className={s.textInfo}>{dataNews.body}</pre>
     </div>

     <div className={s.footerNews}>
      <span className={s.theme}>{selectTypeNews[dataNews.type]}</span>

      {objectSkills?.map((x: any) => {
       if (Object.keys(x).includes("icon")) {
        return <ChipsToolItem itemLabel={x} key={x.id} />;
       } else if (Object.keys(x).includes("color")) {
        return <ChipsGenreItem itemLabel={x} key={x.id} />;
       }
      })}
     </div>
    </section>
   )}
  </StylesFullScreen>
 );
};
