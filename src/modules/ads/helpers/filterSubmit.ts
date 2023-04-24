import { filterTranslateVacancy } from "../service/filterTranslate";
import { FormsFilterType } from "../types/formsFilterType";

export const filterSubmit = (data: FormsFilterType,
  token: "vacancy" | "ads" | "account") => {
  const mainObjFilter = {
    query: data.query,
    pageSize: 5,
    page: 0,
    formId: undefined,
    cityIds: data.city && +data.city.id,
    genreIds: data.genre.map((x) => x.id),
    instrumentIds: data.tool.map((x) => x.id),
  };

  const paramsQueryVacancy = {
    ...mainObjFilter,
    vacancyOwnerFormType: data.who_is_looking_vacancy?.id,
    searchVacancyDocumentType: data.who_is_looking_vacancy_partner ? filterTranslateVacancy[data.who_is_looking_vacancy_partner.id] : undefined,
    institutionTypeId: data.typeOfInstitution?.id,
  };

  const paramsQueryAds = {
    ...mainObjFilter,
    searchAnnouncementDocumentType: data.who_is_looking_ads ? filterTranslateVacancy[data.who_is_looking_ads.id] : undefined,
  };

  const paramsQueryAccount = {
    ...mainObjFilter,
    formType: data.who_is_looking_questionnaire?.id,
    institutionTypeId: data.typeOfInstitution?.id,
    gender: data.gender?.id,
    ageStart: data.fromAge,
    ageEnd: data.toAge,
    teamType: data.teamType?.id,
  };

  if (token === "vacancy") return paramsQueryVacancy
  else if (token === "ads") return paramsQueryAds
  else return paramsQueryAccount

}