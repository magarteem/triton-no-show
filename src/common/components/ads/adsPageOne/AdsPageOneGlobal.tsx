import arrow_back from "../../../../assets/icons/arrow_back.svg";
import shareIcons from "../../../../assets/icons/shareIcons.svg";
import moreButtonCircle from "../../../../assets/icons/more-button-circle.svg";
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
}

export const AdsPageOneGlobal = ({ data, isLoading }: AdsPageOneGlobalType) => {
  return (
    <StylesFullScreen>
      <div>
        <HeaderStylesWrapper
          cancelImgIcon={arrow_back}
          textLabel="Обявления"
          share={shareIcons}
          tsxElement={
            <LongMenu moreButtonCircle={moreButtonCircle} options={useAdsOptionsLongMenu(data)} />
          }
        />
        {isLoading ? <PreLoader /> : data ? <MainContent data={data} /> : null}
      </div>
    </StylesFullScreen>
  );
};
