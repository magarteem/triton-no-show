import { Link } from "react-router-dom";
import { ResultAdsTypeResponse } from "../../../../modules/ads/types/responseAdsType";
import { OptionLongMenuType } from "../../../mui-element/LongMenu";
import { BodyAds } from "../bodyAds/BodyAds";
import { HeaderAds } from "../headerAds/HeaderAds";

interface AnnouncementCardType {
  x: ResultAdsTypeResponse;
  link: string;
  notifikationOPtionsLongMenu?: OptionLongMenuType[];
}

export const AnnouncementCard = ({
  x,
  link,
  notifikationOPtionsLongMenu,
}: AnnouncementCardType) => {
  return (
    <>
      <HeaderAds x={x} link={link} notifikationOPtionsLongMenu={notifikationOPtionsLongMenu} />
      <Link to={link}>
        <BodyAds x={x} />
      </Link>
    </>
  );
};
