import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonSubmitMui } from "../../common/mui-element/ButtonSubmitMui";
import { FormsFilterType } from "./types/formsFilterType";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { optionsTypeAccount } from "../authorization/service/BD";
import {
 requiredADS,
 requiredVacancy,
 teamTypeADS,
 workWidthMusicianTypeADS,
} from "../vacancy/service/createVacancyBD";
import { FilterLayoutWrapper } from "../../common/layout/filterLayoutWraper/FilterLayoutWrapper";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllerGender } from "../../common/hookFormControllers/ControllerGender";
import { ControllerMaster } from "../../common/hookFormControllers/ControllerMaster";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import {
 AdsFilterParamsRequestType,
 VacancyFilterParamsRequestType,
} from "../vacancy/types/FilterFormsAdsFieldsType";
import { RouteNames } from "../../core/router/RouteNames";
import { ControllerRandomSelect } from "../../common/hookFormControllers/ControllerRandomSelect";
import { EnumTypeDocumentType } from "../../types/PROFILE/enum/EnumTypeDocumentType";
import { ControllerAgeRangeRmcPicker } from "../../common/hookFormControllers/ControllerAgeRangeRmcPicker";
import { filterSubmit } from "./helpers/filterSubmit";
import { routeAccount, routeAnonnsemend, routeVacancy } from "./service/routesVariableForAds";
import { useClearResultsqueryAds } from "./hooks/useClearResultsqueryAds";
import { ControllersInstitutionTypeAsync } from "../../common/hookFormControllers/ControllersInstitutionTypeAsync";
import { skipFetchQuery } from "../../helpers/skipFetchQuery";
import s from "./style/filterFormsAds.module.scss";

const deff: FormsFilterType = {
 city: null,
 tool: [],
 genre: [],
 gender: null,
 typeOfInstitution: null,
 teamType: null,
 who_is_looking_vacancy: null,
 who_is_looking_vacancy_partner: null,
 who_is_looking_ads: null,
 who_is_looking_questionnaire: null,
 working_width_musician: null,
 fromAge: null,
 toAge: null,
 master: null,
};

interface FilterFormsAdsType {
 searchQuery: string | null;
 handleClose: () => void;
 setPageFu: (args: AdsFilterParamsRequestType | VacancyFilterParamsRequestType) => void;
 filterState: FormsFilterType;
 setFilterStateFu: (data: any) => void;
 setfilterON: (state: boolean) => void;
 originalArgsAds: any;
 originalArgsVacancy: any;
 originalArgsAccount: any;
 defaultFilter: FormsFilterType;
}

export const FilterFormsAds = ({
 handleClose,
 searchQuery,
 setPageFu,
 filterState,
 setFilterStateFu,
 setfilterON,
 originalArgsAds,
 originalArgsVacancy,
 originalArgsAccount,
 defaultFilter,
}: FilterFormsAdsType) => {
 const navigate = useNavigate();
 const { clearListVacancyPost, clearListAdsPost, clearListAccount } = useClearResultsqueryAds();
 const { pathname } = useLocation();

 const {
  control,
  handleSubmit,
  watch,
  reset,
  setValue,
  formState: { isDirty },
 } = useForm<FormsFilterType>({
  mode: "onBlur",
  defaultValues: filterState,
 });

 const who_is_looking_vacancy_partner = watch("who_is_looking_vacancy_partner")?.id;
 const who_is_looking_vacancy = watch("who_is_looking_vacancy")?.id;
 const who_is_looking_ads = watch("who_is_looking_ads")?.id;
 const who_is_looking_questionnaire = watch("who_is_looking_questionnaire")?.id;

 useEffect(() => {
  searchQuery && onSubmit({ ...deff, query: searchQuery });
 }, [searchQuery]);

 const resetFormFields = () => {
  //clearListVacancyPost();
  //clearListAdsPost();
  //clearListAccount();

  setfilterON(false);
  reset(deff);
  setSubmitFu(defaultFilter);
 };

 const setSubmitFu = (data: FormsFilterType) => {
  switch (pathname) {
   case routeVacancy:
    if (!skipFetchQuery(originalArgsVacancy, filterSubmit(data, "vacancy"))) {
     clearListVacancyPost();
     setPageFu(filterSubmit(data, "vacancy"));
     navigate(RouteNames.ADS);
    }
    break;
   case routeAnonnsemend:
    if (!skipFetchQuery(originalArgsAds, filterSubmit(data, "ads"))) {
     clearListAdsPost();
     setPageFu(filterSubmit(data, "ads"));
     navigate(RouteNames.ADS_LIST);
    }
    break;
   default:
    if (!skipFetchQuery(originalArgsAccount, filterSubmit(data, "account"))) {
     clearListAccount();
     setPageFu(filterSubmit(data, "account"));
     navigate(RouteNames.ADS_QUESTIONNAIRE_LIST);
    }
  }
 };

 const onSubmit = (data: FormsFilterType) => {
  if (isDirty) setfilterON(true);
  handleClose();
  setSubmitFu(data);
 };

 useEffect(() => {
  // * automatic transfer of data between tabs * //
  const subscription = watch((value) => {
   setFilterStateFu(value);
  });
  return () => subscription.unsubscribe();
 }, [watch]);

 return (
  <FilterLayoutWrapper handleClose={handleClose}>
   <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className={s.headerForms}>
     <h1>Фильтр</h1>
     <IconButton
      onClick={resetFormFields}
      sx={{
       borderRadius: "10px",
       padding: "13px",
      }}
     >
      <h5>Очистить</h5>
     </IconButton>
    </div>

    <div className={s.gawField}>
     <ControllersCityAsync
      name="city"
      placeholder="Город"
      control={control}
      setValue={setValue}
      required={false}
     />
     <ControllerToolsAsync
      control={control}
      placeholder="Инструмент (род деятельности)"
      name="tool"
      required={false}
     />
     <ControllerGenreAsync control={control} name="genre" required={false} />

     <h2 className={s.filterForVacancy}>
      {pathname === routeVacancy
       ? "Фильтр по вакансиям"
       : pathname === routeAnonnsemend
       ? "Фильтр по объявлениям"
       : "Фильтр по анкетам"}
     </h2>

     {pathname === routeVacancy ? (
      <ControllerRandomSelect
       control={control}
       placeholder="Кто ищет?"
       name="who_is_looking_vacancy"
       options={optionsTypeAccount}
      />
     ) : pathname === routeAnonnsemend ? (
      <ControllerRandomSelect
       control={control}
       placeholder="Что/кого ищут?"
       name="who_is_looking_ads"
       options={requiredADS}
      />
     ) : (
      <ControllerRandomSelect
       name="who_is_looking_questionnaire"
       control={control}
       placeholder="Тип аккаунта"
       options={optionsTypeAccount}
      />
     )}

     {pathname === routeVacancy && (
      <>
       {who_is_looking_vacancy === EnumTypeAccount.INSTITUTION && (
        <ControllersInstitutionTypeAsync
         name="typeOfInstitution"
         control={control}
         placeholder="Тип заведения"
        />
       )}
       <ControllerRandomSelect
        control={control}
        placeholder="Кого ищет?"
        name="who_is_looking_vacancy_partner"
        options={requiredVacancy}
       />
      </>
     )}

     {pathname === routeVacancy &&
      (who_is_looking_vacancy_partner === EnumTypeDocumentType.TEAM ? (
       <ControllerRandomSelect
        control={control}
        placeholder="Вид коллектива"
        name="teamType"
        options={teamTypeADS}
       />
      ) : (
       who_is_looking_vacancy_partner === EnumTypeDocumentType.MUSICIAN && (
        <WatchMusician control={control} watch={watch} />
       )
      ))}
     {/*  !---------------------------------------------- */}
     {pathname === routeAnonnsemend &&
      (who_is_looking_ads === EnumTypeDocumentType.TEAM ? (
       <ControllerRandomSelect
        control={control}
        placeholder="Вид коллектива"
        name="teamType"
        options={teamTypeADS}
       />
      ) : who_is_looking_ads === EnumTypeDocumentType.MUSICIAN ? (
       <WatchMusician control={control} watch={watch} />
      ) : who_is_looking_ads === EnumTypeDocumentType.WORK ? (
       <ControllerRandomSelect
        name="who_is_looking_questionnaire"
        control={control}
        placeholder="Место работы"
        options={optionsTypeAccount}
       />
      ) : null)}

     {pathname === routeAnonnsemend &&
      who_is_looking_ads === EnumTypeDocumentType.WORK &&
      (who_is_looking_questionnaire === EnumTypeAccount.MUSICIAN ? (
       <ControllerRandomSelect
        control={control}
        placeholder="Работа с музыкантом"
        name="working_width_musician"
        options={workWidthMusicianTypeADS}
       />
      ) : who_is_looking_questionnaire === EnumTypeAccount.TEAM ? (
       <ControllerRandomSelect
        control={control}
        placeholder="Вид коллектива"
        name="teamType"
        options={teamTypeADS}
       />
      ) : who_is_looking_questionnaire === EnumTypeAccount.INSTITUTION ? (
       <ControllersInstitutionTypeAsync
        name="typeOfInstitution"
        control={control}
        placeholder="Тип заведения"
       />
      ) : null)}

     {/*  !---------------------------------------------- */}
     {pathname === routeAccount &&
      (who_is_looking_questionnaire === EnumTypeAccount.MUSICIAN ? (
       <WatchMusician control={control} watch={watch} />
      ) : who_is_looking_questionnaire === EnumTypeAccount.TEAM ? (
       <ControllerRandomSelect
        control={control}
        placeholder="Вид коллектива"
        name="teamType"
        options={teamTypeADS}
       />
      ) : who_is_looking_questionnaire === EnumTypeAccount.INSTITUTION ? (
       <ControllersInstitutionTypeAsync
        name="typeOfInstitution"
        control={control}
        placeholder="Тип заведения"
       />
      ) : null)}
    </div>

    <div className={s.btnWrapper}>
     <ButtonSubmitMui isValidInButton={false} textButton="Показать результаты" />
    </div>
   </form>
  </FilterLayoutWrapper>
 );
};

interface WatchMusicianType {
 watch: any;
 control: any;
}

const WatchMusician = ({ watch, control }: WatchMusicianType) => {
 return (
  <>
   <ControllerGender control={control} name="gender" required={false} />
   <ControllerAgeRangeRmcPicker control={control} watch={watch} />
   <ControllerMaster control={control} name="master" />
  </>
 );
};
