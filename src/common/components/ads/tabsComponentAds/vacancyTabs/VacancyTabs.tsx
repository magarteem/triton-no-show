import { useOutletContext } from "react-router-dom";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { PreLoader } from "../../../preLoader/PreLoader";
import { AnnouncementFeed } from "../../announcementFeed/AnnouncementFeed";
import { ResponseAdsType } from "../../../../../modules/ads/types/responseAdsType";
import { InButton } from "../../../../ui-elements/button/InButton";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useRef } from "react";
import s from "../toutchStyleAnimations.module.scss";
import { useSwipeHandleTouch } from "../../../../../hook/useSwipeHandleTouch";

const routR = `${RouteNames.ADS}/${RouteNames.ADS_LIST}`;

interface OutletType {
 setPageFu: () => void;
 refetchFu: () => void;
 isLoadingVacancy: boolean;
 isFetchingVacancy: boolean;
 isSuccessVacancy: boolean;
 dataV: ResponseAdsType;
}

export const VacancyTabs = () => {
 const refs = useRef<HTMLDivElement | null>(null);
 useSwipeHandleTouch(refs, "", routR);

 const {
  setPageFu,
  refetchFu,
  isLoadingVacancy,
  isFetchingVacancy,
  isSuccessVacancy,
  dataV,
 }: OutletType = useOutletContext();

 if (isFetchingVacancy && isLoadingVacancy) return <PreLoader />;

 return (
  <div ref={refs} className={s.hiddenAnimationLeft}>
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingVacancy}>
    {dataV?.results.length > 0 && dataV?.results.map((x) => <AnnouncementFeed x={x} key={x.id} />)}

    {dataV?.results.length === 0 && !isFetchingVacancy && (
     <InButton textButton="Ничего не найдено. Назад" isValidInButton={false} onClick={refetchFu} />
    )}
   </RibbonLayout>
  </div>
 );
};
