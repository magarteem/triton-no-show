import { useOutletContext } from "react-router-dom";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { PreLoader } from "../../../preLoader/PreLoader";
import { AnnouncementFeed } from "../../announcementFeed/AnnouncementFeed";
import { ResponseAdsType } from "../../../../../modules/ads/types/responseAdsType";
import { InButton } from "../../../../ui-elements/button/InButton";

export const VacancyTabs = () => {
  const [
    isLoadingAds,
    isFetchingAds,
    setPageFu,
    refetchFu,
    dataAds,
    isLoadingVacancy,
    isFetchingVacancy,
    dataVacancy,
  ]: [
    boolean,
    boolean,
    () => void,
    () => void,
    ResponseAdsType,
    boolean,
    boolean,
    ResponseAdsType
  ] = useOutletContext();

  if (isLoadingVacancy) return <PreLoader />;

  return (
    <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingVacancy}>
      {dataVacancy?.results.length > 0 &&
        dataVacancy?.results.map((x) => <AnnouncementFeed x={x} key={x.id} />)}

      {dataVacancy?.results.length === 0 && !isFetchingVacancy && (
        <InButton
          textButton="Ничего не найдено. Назад"
          isValidInButton={false}
          onClick={refetchFu}
        />
      )}

      {/*{dataVacancy?.results.length > 0 ? (
    dataVacancy?.results.map((x) => <AnnouncementFeed x={x} profile={profile} key={x.id} />)
   ) : (
    <InButton textButton="Ничего не найдено. Назад" isValidInButton={false} onClick={refetchFu} />
   )}*/}
    </RibbonLayout>
  );
};

//isFetchingVacancy ? null :
