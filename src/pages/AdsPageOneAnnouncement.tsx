import { useParams } from "react-router-dom";
import { AdsPageOneGlobal } from "../common/components/ads/adsPageOne/AdsPageOneGlobal";
import { useOneAnnouncementPostQuery } from "../modules/vacancy/adsQuery";

export const AdsPageOneAnnouncement = () => {
 const { id_ads } = useParams();
 const { data, isLoading, refetch } = useOneAnnouncementPostQuery(id_ads || "", {
  skip: !id_ads,
 });

 return <AdsPageOneGlobal data={data} isLoading={isLoading} refetch={refetch} />;
};
