import noAvatar from "../../../../../assets/icons/noAvatar.svg";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { ResultAdsTypeResponse } from "../../../../../modules/ads/types/responseAdsType";
import {
 skillGenerator,
 translationGender,
} from "../../../../../modules/vacancy/service/selectTranslation";
import { SkillsLayoutGenre } from "../../../profile/aboutProfile/skills/SkillsLayoutGenre";
import { SkillsLayoutTools } from "../../../profile/aboutProfile/skills/SkillsLayoutTools";
import { RespondButton } from "../../respondButton/RespondButton";
import { ContactsElement } from "../contactsElement/ContactsElement";
import { HeaderPageOneAds } from "../headerPageOneAds/HeaderPageOneAds";
import cn from "classnames";
import s from "./mainContent.module.scss";
import { useAppSelector } from "../../../../../core/redux/app/hooks";
import { optionTypeMyAccountLowerCase } from "../../../../../modules/user/helpers/optionTypeMyAccount";
import { PlaceOfWork } from "../advancedInfoForAds/PlaceOfWork";

interface MainContentType {
 data: ResultAdsTypeResponse;
 refetch: () => void;
}

export const MainContent = ({ data, refetch }: MainContentType) => {
 const { allMyForms } = useAppSelector((state) => state.userSliceReducer);

 const muz = data.musicianAnnouncementDocument;
 const team = data.teamAnnouncementDocument;
 const producer = data.soundProducerAnnouncementDocument;
 const job = data.jobDocument;

 return (
  <section className={s.bodyAdsPageOne}>
   <HeaderPageOneAds data={data} />
   <div className={s.about}>
    <pre className={s.tagPreFormatter}>
     {data.conditions?.scheduleDescription ||
      job?.conditions.scheduleDescription ||
      muz?.cooperationTerms ||
      team?.cooperationTerms}
    </pre>
   </div>
   {muz && (
    <>
     {muz.gender && muz.gender !== "Undefined" && (
      <div className={s.styleAbout}>
       <span className={s.titleSpan}>Пол:</span>
       {translationGender[muz.gender]}
      </div>
     )}

     {muz.ageRange && (
      <div className={s.styleAbout}>
       <span className={s.titleSpan}>Возраст:</span>
       {` ${muz.ageRange?.start} - ${muz.ageRange?.finish}`}
      </div>
     )}
    </>
   )}

   {data?.experience && (
    <div className={s.styleAbout}>
     <span className={s.titleSpan}>Опыт работы/выступлений:</span>
     {typeof data?.experience == "string" && (
      <pre className={s.tagPreFormatter}>{data?.experience}</pre>
     )}
    </div>
   )}

   {(muz || producer || job) && (
    <div className={s.styleAbout}>
     {producer?.age && (
      <div className={s.styleAbout}>
       <span className={s.titleSpan}>Возраст:</span>
       {` ${producer.age?.start} - ${producer.age?.finish}`}
      </div>
     )}

     {((!!muz?.skills.length && muz?.skills[0] !== "Undefined") ||
      (!!producer?.skills.length && producer?.skills[0] !== "Undefined") ||
      (!!job?.skills.length && job?.skills[0] !== "Undefined")) && (
      <>
       <span className={s.titleSpan}>Мастерство:</span>
       {muz && skillGenerator[muz.skills]?.name}
       {producer && skillGenerator[producer.skills]?.name}
       {job && skillGenerator[job.skills]?.name}
      </>
     )}
    </div>
   )}

   {data.description && (
    <div className={s.styleAbout}>
     <span className={s.titleSpan}>{job ? "О себе:" : "Требования:"}</span>
     <pre className={s.tagPreFormatter}>{data.description}</pre>
    </div>
   )}

   {(job || team) && <PlaceOfWork data={data} />}

   {data.contacts && data.contacts.map((x) => <ContactsElement key={x.contactType} contacts={x} />)}

   <Link to={`${RouteNames.OTHER_PROFILE_USER}/${data.form.formId}`} className={s.educatione}>
    <div className={s.itemImg}>
     <Avatar alt="avatar" src={data.form.avatar?.uri || noAvatar} />
    </div>
    <div className={s.text}>
     {/*<p>{`${data.form.city.title}${data.form.address ? ", " + data.form.address : ""}`}</p>*/}
     <p>
      {
       optionTypeMyAccountLowerCase[
        data.form.type?.toLowerCase() ?? data.form.formType?.toLowerCase()
       ]
      }
     </p>

     <p>{data.form.name}</p>
    </div>
   </Link>

   {data?.instruments.length > 0 && (
    <div className={cn(s.reStyleImportant, s.border)}>
     <SkillsLayoutTools
      skillsDataItem={data.instruments}
      skillsCategoryTitle={team ? "Состав" : "Инструменты"}
     />
    </div>
   )}

   {data?.genres.length > 0 && (
    <div className={s.reStyleImportant}>
     <SkillsLayoutGenre skillsDataItem={data.genres} skillsCategoryTitle="Жанр" />
    </div>
   )}

   {!allMyForms.includes(data.form.formId) && (
    <RespondButton
     idPost={data.id}
     statusAds={data.announcementStatusResponse}
     autorThisPost={data.form.formId}
     refetch={refetch}
    />
   )}
  </section>
 );
};
