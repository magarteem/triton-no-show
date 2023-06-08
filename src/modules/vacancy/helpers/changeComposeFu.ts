import { ContactsType } from "../../../types/PROFILE/accountMainGlobalType";
import { EnumTypeDocumentType } from "../../../types/PROFILE/enum/EnumTypeDocumentType";
import { ResultAdsTypeResponse } from "../../ads/types/responseAdsType";
import { genderBD, optionsTypeAccount, skillBD } from "../../authorization/service/BD";
import {
 teamTypeADS,
 workWidthMusicianTypeADS,
 workingConditionsBD,
} from "../service/createVacancyBD";

export const changeComposeFu = (data: ResultAdsTypeResponse | undefined) => {
 const spreadOpenObject = {
  ...data,
  ...data?.jobDocument,
  ...data?.soundProducerAnnouncementDocument,
  ...data?.teamAnnouncementDocument,
  ...data?.musicianAnnouncementDocument,
 };

 const changeData = {
  tool: spreadOpenObject.instruments || [],
  genre: spreadOpenObject.genres,
  city: { id: spreadOpenObject?.city?.id, name: data?.city.title },
  gender: genderBD.find((x) => x.id === spreadOpenObject?.gender),
  fromAge:
   spreadOpenObject.ageRange?.start ??
   spreadOpenObject.soundProducerAnnouncementDocument?.age?.start,
  toAge:
   spreadOpenObject.ageRange?.finish ??
   spreadOpenObject.soundProducerAnnouncementDocument?.age?.finish,
  // !
  work_experience: spreadOpenObject.experience,
  master: spreadOpenObject.skills
   ? skillBD.find((x) => spreadOpenObject?.skills && x.id === spreadOpenObject.skills[0])
   : null,
  commit: spreadOpenObject.description,
  payment: spreadOpenObject.conditions?.salary,
  // !
  workingConditions: workingConditionsBD.find(
   (x) => x.id === spreadOpenObject.conditions?.employmentType
  ),
  whoAreLooking: teamTypeADS.find((x) => x.id === spreadOpenObject?.teamType),
  commitAbout:
   spreadOpenObject.conditions?.scheduleDescription ||
   spreadOpenObject.musicianAnnouncementDocument?.cooperationTerms ||
   spreadOpenObject.teamAnnouncementDocument?.cooperationTerms,
  phone: data?.contacts.find((x: ContactsType) => x.contactType === "phone")?.value,
  email: data?.contacts.find((x: ContactsType) => x.contactType === "email")?.value,
  web_site: data?.contacts.find((x: ContactsType) => x.contactType === "web-site")?.value,
 };

 const nVacancy = () => {
  if (data?.soundProducerAnnouncementDocument)
   return { id: EnumTypeDocumentType.SOUND_PRODUCER, name: "Звукорежиссёр" };
  else if (data?.teamAnnouncementDocument)
   return { id: EnumTypeDocumentType.TEAM, name: "Коллектив" };
  else return { id: EnumTypeDocumentType.MUSICIAN, name: "Музыкант" };
 };

 const nAds = () => {
  if (data?.jobDocument) return { id: EnumTypeDocumentType.WORK, name: "Работу" };
  else if (data?.teamAnnouncementDocument)
   return { id: EnumTypeDocumentType.TEAM, name: "Коллектив" };
  else return { id: EnumTypeDocumentType.MUSICIAN, name: "Музыканта" };
 };

 const typeOfInstitution = spreadOpenObject.institutionTypes?.length
  ? {
     id: spreadOpenObject.institutionTypes[0]?.id,
     name: spreadOpenObject.institutionTypes[0]?.type,
    }
  : null;

 const vacancyObj = {
  ...changeData,
  required: nVacancy(),
 };

 const adsObj = {
  ...changeData,
  required: nAds(),
  typeOfInstitution,
  who_is_looking_questionnaire: spreadOpenObject.formTypes
   ? optionsTypeAccount.find(
      (x) =>
       spreadOpenObject.formTypes && x.id === spreadOpenObject.formTypes[0]?.toLocaleLowerCase()
     )
   : null,

  teamType: teamTypeADS.find(
   (x) => spreadOpenObject?.teamTypes && x.id === spreadOpenObject.teamTypes[0]
  ),
  working_width_musician: workWidthMusicianTypeADS.find(
   (x) => spreadOpenObject?.musicianTypes && x.id === spreadOpenObject.musicianTypes[0]
  ),
 };

 return { vacancyObj, adsObj };
};
