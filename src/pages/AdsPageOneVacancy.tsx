import { useParams } from "react-router-dom";
import { AdsPageOneGlobal } from "../common/components/ads/adsPageOne/AdsPageOneGlobal";
import { useOneVacancyPostQuery } from "../modules/vacancy/adsQueryVacancy";

export const AdsPageOneVacancy = () => {
 const { id_ads } = useParams();
 const { data, isLoading, refetch } = useOneVacancyPostQuery(id_ads || "", {
  skip: !id_ads,
 });

 return <AdsPageOneGlobal data={data} isLoading={isLoading} refetch={refetch} />;
};
