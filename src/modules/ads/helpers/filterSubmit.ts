import { EnumTypeAccount } from "../../../types/PROFILE/enum/EnumTypeAccount";
import { EnumTypeDocumentType } from "../../../types/PROFILE/enum/EnumTypeDocumentType";
import { filterTranslateVacancy } from "../service/filterTranslate";
import { FormsFilterType } from "../types/formsFilterType";

export const filterSubmit = (data: FormsFilterType, token: "vacancy" | "ads" | "account") => {
 console.log("data", data);
 const mainObjFilter = {
  query: data.query,
  pageSize: 10,
  page: 0,
  formId: undefined,
  cityIds: data.city && +data.city.id,
  genreIds: data.genre.map((x) => x.id),
  instrumentIds: data.tool.map((x) => x.id),
 };

 const paramsQueryVacancyFu = () => {
  const paramsQueryVacancy = {
   ...mainObjFilter,
   vacancyOwnerFormType: data.who_is_looking_vacancy?.id,
   searchVacancyDocumentType: data.who_is_looking_vacancy_partner
    ? filterTranslateVacancy[data.who_is_looking_vacancy_partner.id]
    : undefined,
   institutionTypeId:
    data.who_is_looking_vacancy?.id === EnumTypeAccount.INSTITUTION
     ? data.typeOfInstitution?.id
     : undefined,
  };

  if (data.who_is_looking_vacancy_partner?.id === EnumTypeDocumentType.MUSICIAN) {
   return {
    ...paramsQueryVacancy,
    gender: data.gender?.id,
    fromAge: data.fromAge,
    toAge: data.toAge,
    master: data.master?.id, //пока не реализовано на бэке
   };
  } else if (data.who_is_looking_vacancy_partner?.id === EnumTypeDocumentType.TEAM) {
   return {
    ...paramsQueryVacancy,
    teamTypes: data.teamType?.id,
   };
  } else {
   return paramsQueryVacancy;
  }
 };

 const paramsQueryAdsFu = () => {
  const paramsQueryAds = {
   ...mainObjFilter,
   searchAnnouncementDocumentType: data.who_is_looking_ads
    ? filterTranslateVacancy[data.who_is_looking_ads.id]
    : undefined,
   neededEmployeeTypes: undefined,
  };

  if (data.who_is_looking_ads?.id === EnumTypeDocumentType.WORK) {
   switch (data.who_is_looking_questionnaire?.id) {
    case EnumTypeAccount.TEAM:
     return {
      ...paramsQueryAds,
      formTypes: data.who_is_looking_questionnaire?.id,
      teamTypes: data.teamType?.id,
     };
    case EnumTypeAccount.MUSICIAN:
     return {
      ...paramsQueryAds,
      formTypes: data.who_is_looking_questionnaire?.id,
      musicianTypes: data.working_width_musician?.id,
     };
    case EnumTypeAccount.INSTITUTION:
     return {
      ...paramsQueryAds,
      formTypes: data.who_is_looking_questionnaire?.id,
      institutionTypeIds: data.typeOfInstitution?.id,
     };

    default:
     return {
      ...paramsQueryAds,
      formTypes: data.who_is_looking_questionnaire?.id,
     };
   }
  } else if (data.who_is_looking_ads?.id === EnumTypeDocumentType.MUSICIAN) {
   return {
    ...paramsQueryAds,
    gender: data.gender?.id,
    fromAge: data.fromAge,
    toAge: data.toAge,
    master: data.master?.id, //пока не реализовано на бэке
   };
  } else {
   return {
    ...paramsQueryAds,
    teamTypes: data.teamType?.id,
   };
  }
 };

 const paramsQueryAccountFu = () => {
  const paramsQueryAccount = {
   ...mainObjFilter,
   formType: data.who_is_looking_questionnaire?.id,
  };

  switch (data.who_is_looking_questionnaire?.id) {
   case EnumTypeAccount.TEAM:
    return {
     ...paramsQueryAccount,
     formTypes: data.who_is_looking_questionnaire?.id,
     teamTypes: data.teamType?.id,
    };
   case EnumTypeAccount.MUSICIAN:
    return {
     ...paramsQueryAccount,
     formTypes: data.who_is_looking_questionnaire?.id,
     gender: data.gender?.id,
     ageStart: data.fromAge,
     ageEnd: data.toAge,
     master: data.master?.id, //пока не реализовано на бэке
    };
   case EnumTypeAccount.INSTITUTION:
    return {
     ...paramsQueryAccount,
     formTypes: data.who_is_looking_questionnaire?.id,
     institutionTypeId: data.typeOfInstitution?.id,
    };

   default:
    return {
     ...paramsQueryAccount,
     formTypes: data.who_is_looking_questionnaire?.id,
    };
  }
 };

 if (token === "vacancy") return paramsQueryVacancyFu();
 else if (token === "ads") {
  return paramsQueryAdsFu();
 } else return paramsQueryAccountFu();
};
