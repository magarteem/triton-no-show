import { ReactComponent as ArrowBack } from "../../../../assets/icons/arrow_back.svg";
import { ReactComponent as ShareIcons } from "../../../../assets/icons/shareIcons.svg";
import { ReactComponent as MoreButtonCircle } from "../../../../assets/icons/more-button-circle.svg";
import { StylesFullScreen } from "../../../layout/stylesFullScreen/StylesFullScreen";
import { HeaderStylesWrapper } from "../../../layout/headerStylesWrapper/HeaderStylesWrapper";
import { LongMenu } from "../../../mui-element/LongMenu";
import { ResultAdsTypeResponse } from "../../../../modules/ads/types/responseAdsType";
import { useAdsOptionsLongMenu } from "../../../../modules/ads/hooks/useAdsOptionsLongMenu";
import { MainContent } from "./mainContent/MainContent";
import { PreLoader } from "../../preLoader/PreLoader";

interface AdsPageOneGlobalType {
 data: ResultAdsTypeResponse | undefined;
 isLoading: boolean;
 refetch: () => void;
}

export const AdsPageOneGlobal = ({ data, isLoading, refetch }: AdsPageOneGlobalType) => {
 return (
  <StylesFullScreen>
   <div>
    <HeaderStylesWrapper
     cancelImgIcon={<ArrowBack />}
     textLabel="Объявления"
     share={<ShareIcons />}
     tsxElement={
      <LongMenu moreButtonCircle={<MoreButtonCircle />} options={useAdsOptionsLongMenu(data)} />
     }
    />
    {isLoading ? <PreLoader /> : data ? <MainContent data={data} refetch={refetch} /> : null}
   </div>
  </StylesFullScreen>
 );
};
