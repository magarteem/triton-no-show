import { EnumTypeAccount } from "../../../types/PROFILE/enum/EnumTypeAccount";
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

  const paramsQueryVacancy = {
    ...mainObjFilter,
    vacancyOwnerFormType: data.who_is_looking_vacancy?.id,
    searchVacancyDocumentType: data.who_is_looking_vacancy_partner
      ? filterTranslateVacancy[data.who_is_looking_vacancy_partner.id]
      : undefined,
    institutionTypeId: data.typeOfInstitution?.id,
  };

  const paramsQueryAds = {
    ...mainObjFilter,
    searchAnnouncementDocumentType: data.who_is_looking_ads
      ? filterTranslateVacancy[data.who_is_looking_ads.id]
      : undefined,
    formTypes: data.who_is_looking_questionnaire_inner?.id,
    teamTypes: data.teamType?.id,
    institutionTypeIds: data.typeOfInstitution?.id,
    neededEmployeeTypes: undefined,
    musicianTypes: data.working_width_musician?.id,
  };

  //
  const paramsQueryAdsFu = () => {
    const paramsQueryAds = {
      ...mainObjFilter,
      searchAnnouncementDocumentType: data.who_is_looking_ads
        ? filterTranslateVacancy[data.who_is_looking_ads.id]
        : undefined,
      neededEmployeeTypes: undefined,
    };


    if (data.who_is_looking_ads?.id === "work") {
      // return {
      //  ...paramsQueryAds,
      //  formTypes: data.who_is_looking_questionnaire_inner?.id,
      //  musicianTypes: data.working_width_musician?.id,
      // };

      switch (data.who_is_looking_questionnaire_inner?.id) {
        case "team":
          return {
            ...paramsQueryAds,
            formTypes: data.who_is_looking_questionnaire_inner?.id,
            teamTypes: data.teamType?.id,
          };
        case EnumTypeAccount.MUSICIAN:
          return {
            ...paramsQueryAds,
            formTypes: data.who_is_looking_questionnaire_inner?.id,
            musicianTypes: data.working_width_musician?.id,
          };
        case EnumTypeAccount.INSTITUTION:
          return {
            ...paramsQueryAds,
            formTypes: data.who_is_looking_questionnaire_inner?.id,
            institutionTypeIds: data.typeOfInstitution?.id,
          };

        default:
          return paramsQueryAds;
      }
    } else if (data.who_is_looking_ads?.id === EnumTypeAccount.MUSICIAN) {
      return paramsQueryAds;
    } else {
      return {
        ...paramsQueryAds,
        teamTypes: data.teamType?.id,
      };
    }
  };

  paramsQueryAdsFu();
  //
  const paramsQueryAccount = {
    ...mainObjFilter,
    formType: data.who_is_looking_questionnaire?.id,
    institutionTypeId: data.typeOfInstitution?.id,
    gender: data.gender?.id,
    ageStart: data.fromAge,
    ageEnd: data.toAge,
    teamType: data.teamType?.id,
  };

  if (token === "vacancy") return paramsQueryVacancy;
  else if (token === "ads") {
    console.log("paramsQueryAds", paramsQueryAds);
    return paramsQueryAdsFu();
    //return paramsQueryAds;
  } else return paramsQueryAccount;
};
