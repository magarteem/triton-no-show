import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClearResultsqueryAds } from "../modules/ads/hooks/useClearResultsqueryAds";
import { FormsFilterType } from "../modules/ads/types/formsFilterType";
import { defaultFilter } from "../modules/ads/service/filterTranslate";

export const Ads = () => {
  const { clearListVacancyPost, clearListAdsPost, clearListAccount } = useClearResultsqueryAds();
  const [filterON, setfilterON] = useState(false);

  const [filterState, setfilterState] = useState<FormsFilterType>(defaultFilter);
  const setFilterStateFu = (data: FormsFilterType) => setfilterState(data);

  useEffect(() => {
    return () => {
      // reset filer after return this pages if filter is active
      if (filterON) {
        clearListVacancyPost();
        clearListAdsPost();
        clearListAccount();
      }
    };
  }, [filterON]);

  return (
    <>
      <Outlet
        context={{
          filterON,
          setfilterON,
          filterState,
          setFilterStateFu,
        }}
      />
    </>
  );
};
