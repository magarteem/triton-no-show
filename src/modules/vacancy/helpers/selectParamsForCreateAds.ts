import { EnumTypeDocumentType } from "../../../types/PROFILE/enum/EnumTypeDocumentType";
import { RequestAdsType } from "../../ads/types/requestAdsType";
import { FormsCreatedVacancyType } from "../types/typeFormsCreatedAds";

export const selectParamsForCreateAds = (
 data: FormsCreatedVacancyType,
 idMyActiveForms: string
): RequestAdsType => {
 console.log(data);
 const tempContact = [
  { contactType: "phone", value: data.phone },
  { contactType: "email", value: data.email },
  { contactType: "web-site", value: data.web_site },
 ];

 const conditions = {
  salary: data.payment,
  employmentType: data.workingConditions?.id || "None",
  scheduleDescription: data.commitAbout,
 };

 const paramsMain = {
  formId: idMyActiveForms,
  title: `Ищу ${data.required?.name.toLowerCase()}`,
  cityId: data.city?.id,
  experience: data.work_experience,
  contacts: tempContact.filter((x) => {
   return !!x.value;
  }),
  genreIds: data.genre.map((x) => x.id),
  instrumentIds: data.tool.map((x) => x.id),
  description: data.commit,
  //description: data.workingConditions,
 };

 switch (data.required?.id) {
  case EnumTypeDocumentType.MUSICIAN: {
   const musicianAnnouncementDocument = {
    gender: data.gender?.id || null,
    ageRange:
     data.fromAge && data.toAge
      ? {
         start: data.fromAge,
         finish: data.toAge,
        }
      : null,
    skills: data.master ? [data.master.id] : [],
    education: "",
    cooperationTerms: data.commitAbout,
   };
   return {
    ...paramsMain,
    musicianAnnouncementDocument,
    teamAnnouncementDocument: null,
    jobDocument: null,
   };
  }

  case EnumTypeDocumentType.TEAM: {
   const teamAnnouncementDocument = {
    teamType: data.whoAreLooking?.id || "Undefined",
    cooperationTerms: data.commitAbout,
   };
   return {
    ...paramsMain,
    teamAnnouncementDocument,
    musicianAnnouncementDocument: null,
    jobDocument: null,
   };
  }

  default:
   return {
    ...paramsMain,
    musicianAnnouncementDocument: null,
    teamAnnouncementDocument: null,
    jobDocument: {
     skills: data.master ? [data.master.id] : [],
     //[ None, Musician, Team, SoundEngineer ]
     neededEmployeeTypes: ["None"],
     conditions,
     jobTypes: ["MusicianSchool"],
     teamTypes: ["Orchestra"],
     institutionTypeIds: [data.typeOfInstitution ? data.typeOfInstitution?.id : "Undefined"],
    },
   };
 }
};
