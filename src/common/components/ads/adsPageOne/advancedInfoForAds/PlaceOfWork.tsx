import React from "react";
import { ResultAdsTypeResponse } from "../../../../../modules/ads/types/responseAdsType";
import { optionsTypeAccount } from "../../../../../modules/authorization/service/BD";
import {
 teamTypeADS,
 workWidthMusicianTypeADS,
} from "../../../../../modules/vacancy/service/createVacancyBD";
import { EnumTypeAccount } from "../../../../../types/PROFILE/enum/EnumTypeAccount";
import s from "../mainContent/mainContent.module.scss";

interface PlaceOfWorkType {
 data: ResultAdsTypeResponse;
}
export const PlaceOfWork = ({ data }: PlaceOfWorkType) => {
 const team = data.teamAnnouncementDocument;
 const job = data.jobDocument;

 return (
  <>
   <div className={s.styleAbout}>
    {job && !!job.formTypes.length && (
     <>
      <span className={s.titleSpan}>Место работы:</span>
      {optionsTypeAccount.find((x) => x.id.toLowerCase() === job?.formTypes[0].toLowerCase())?.name}
     </>
    )}
    {team && team.teamType && (
     <>
      <span className={s.titleSpan}>Вид коллектива:</span>
      {teamTypeADS.find((x) => x.id === team.teamType)?.name}
     </>
    )}
   </div>

   <div className={s.styleAbout}>
    <>
     {job && !!job.formTypes.length && (
      <>
       {job.formTypes[0].toLowerCase() === EnumTypeAccount.MUSICIAN ? (
        <>
         <span className={s.titleSpan}>Работа с музыкантом:</span>
         {workWidthMusicianTypeADS.find((x) => x.id === job.musicianTypes[0])?.name}
        </>
       ) : job.formTypes[0].toLowerCase() === EnumTypeAccount.TEAM ? (
        <>
         <span className={s.titleSpan}>Вид коллектива:</span>
         {teamTypeADS.find((x) => x.id === job.teamTypes[0])?.name}
        </>
       ) : (
        job.formTypes[0].toLowerCase() === EnumTypeAccount.INSTITUTION && (
         <>
          <span className={s.titleSpan}>Тип заведения:</span>
          {job.institutionTypes[0].type}
          {/*{teamTypeADS.find((x) => x.id === job.teamTypes[0])?.name}*/}
         </>
        )
       )}
      </>
     )}
    </>
   </div>
  </>
 );
};
