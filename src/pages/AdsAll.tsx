import { ChangeEvent, useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { ReactComponent as FilterIconsNew } from "../assets/icons/filterIconsNew.svg";
import searchIcon from "../assets/icons/searchIcon.svg";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { TabsComponentAds } from "../common/components/ads/tabsComponentAds/TabsComponentAds";
import { useAppSelector } from "../core/redux/app/hooks";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { FilterModalLayout } from "../common/layout/filterModalLayout/FilterModalLayout";
import { FilterFormsAds } from "../modules/ads/FilterFormsAds";
import {
 AdsFilterParamsRequestType,
 OutletAdsType,
 VacancyFilterParamsRequestType,
} from "../modules/vacancy/types/FilterFormsAdsFieldsType";
import { ResponseAdsType } from "../modules/ads/types/responseAdsType";
import { useListAdsQuery } from "../modules/vacancy/adsQuery";
import { useListAccountQuery } from "../modules/user/getGetMyProfileQuery";
import { FilterSearchAllFormsType } from "../modules/user/types/filterSearchAllFormsType";
import { ResponseSearchAllFormsType } from "../modules/user/types/responseSearchAllForms";
import { useDebounce } from "../hook/useDebiunce";
import {
 routeAccount,
 routeAnonnsemend,
 routeVacancy,
} from "../modules/ads/service/routesVariableForAds";
import { useClearResultsqueryAds } from "../modules/ads/hooks/useClearResultsqueryAds";
import { sxStyle } from "./styles/sx";
import { filterSubmit } from "../modules/ads/helpers/filterSubmit";
import { skipFetchQuery } from "../helpers/skipFetchQuery";
import { useListVacancyQuery } from "../modules/vacancy/adsQueryVacancy";
import { ColorModeContext } from "../contextProvider/MuiThemeContext";
import { defaultFilter } from "../modules/ads/service/filterTranslate";
import cn from "classnames";
import s from "./styles/adsAll.module.scss";

export const AdsAll = () => {
 const { mode } = useContext(ColorModeContext);
 let { pathname } = useLocation();
 const { clearListVacancyPost, clearListAdsPost, clearListAccount } = useClearResultsqueryAds();
 const { filterON, setfilterON, filterState, setFilterStateFu }: OutletAdsType = useOutletContext();

 const [open, setOpen] = useState(false);
 const handleClickOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 //! --- ADS -------------------------------
 const storeListAds = useAppSelector((state) => state.adsQuery.queries.listAds);
 const [pageparamsAds, setPageparamsAds] = useState<AdsFilterParamsRequestType>({ page: 0 });

 const {
  data: dataAds,
  isLoading: isLoadingAds,
  isFetching: isFetchingAds,
  originalArgs: originalArgsAds,
 } = useListAdsQuery(pageparamsAds, {
  skip: pathname !== routeAnonnsemend,
 });

 //! --- VACANCY -------------------------------
 const storeListVacancy = useAppSelector(
  (state) => state.adsQuery.queries.listVacancy?.data
 ) as ResponseAdsType;
 const [pageparamsVacancy, setPageparamsVacancy] = useState<VacancyFilterParamsRequestType>({
  page: 0,
 });
 const {
  data: dataV,
  isLoading: isLoadingVacancy,
  isFetching: isFetchingVacancy,
  isSuccess: isSuccessVacancy,
  originalArgs: originalArgsVacancy,
 } = useListVacancyQuery(pageparamsVacancy, {
  skip: pathname !== routeVacancy,
 });

 //! --- ACCOUNT -------------------------------
 const storeListAccount = useAppSelector(
  (state) => state.getMyProfileQuery.queries.listAccount?.data
 ) as ResponseSearchAllFormsType;
 const [pageparamsAccount, setPageparamsAccount] = useState<FilterSearchAllFormsType>({ page: 0 });
 const {
  data: dataA,
  isLoading: isLoadingAccount,
  isFetching: isFetchingAccount,
  originalArgs: originalArgsAccount,
 } = useListAccountQuery(pageparamsAccount, {
  skip: pathname !== routeAccount,
 });

 //! --- search -------------------------------
 const [value, setValue] = useState<string>("");
 const debouncedValue = useDebounce<string>(value, 500);

 const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

 useEffect(() => {
  setValue("");

  if (filterON) {
   switch (pathname) {
    case routeVacancy:
     if (!skipFetchQuery(originalArgsVacancy, filterSubmit(filterState, "vacancy"))) {
      clearListVacancyPost();
      setPageFu(filterSubmit(filterState, "vacancy"));
     }
     break;
    case routeAnonnsemend:
     if (!skipFetchQuery(originalArgsAds, filterSubmit(filterState, "ads"))) {
      clearListAdsPost();
      setPageFu(filterSubmit(filterState, "ads"));
     }
     break;
    default:
     if (!skipFetchQuery(originalArgsAccount, filterSubmit(filterState, "account"))) {
      clearListAccount();
      setPageFu(filterSubmit(filterState, "account"));
     }
   }
  }
 }, [pathname]);

 const setPageFu = (
  params: AdsFilterParamsRequestType | VacancyFilterParamsRequestType | FilterSearchAllFormsType
 ) => {
  if (pathname === routeVacancy) {
   if (params) setPageparamsVacancy({ ...params });
   else {
    setPageparamsVacancy({
     ...pageparamsVacancy,
     page: dataV && dataV.results.length > 0 ? dataV.currentPage + 1 : 0,
    });
   }
  } else if (pathname === routeAnonnsemend) {
   if (params) setPageparamsAds({ ...params });
   else {
    setPageparamsAds({
     ...pageparamsAds,
     page: dataAds && dataAds.results.length > 0 ? dataAds.currentPage + 1 : 0,
    });
   }
  } else {
   if (params) setPageparamsAccount({ ...params });
   else {
    setPageparamsAccount({
     ...pageparamsAccount,
     page: dataA && dataA.results.length > 0 ? dataA.currentPage + 1 : 0,
    });
   }
  }
 };

 //! ----------------------------------
 const refetchFu = () => {
  if (pathname === routeVacancy) {
   clearListVacancyPost();
   setPageparamsVacancy({ page: 0 });
  } else if (pathname === routeAnonnsemend) {
   clearListAdsPost();
   setPageparamsAds({ page: 0 });
  } else {
   clearListAccount();
   setPageparamsAccount({ page: 0 });
  }
 };

 useEffect(() => {
  const elem = document.body;
  open && elem.classList.add("cssGlobalHTML");
  //@ts-ignore
  open && elem.parentNode.classList.add("cssGlobalHTML");

  return () => {
   elem.classList.remove("cssGlobalHTML");
   //@ts-ignore
   elem.parentNode.classList.remove("cssGlobalHTML");
  };
 }, [open]);

 return (
  <>
   <StylesFullScreen>
    <div className={s.customAddPadding}>
     <HeaderStylesWrapper
      anyIconsFirst={{
       img: <FilterIconsNew className={cn({ [s.svgNode]: filterON })} />,
       action: pathname,
      }}
      anyIconActivSpecified={filterON}
      onClickAnyIconsFirst={handleClickOpen}
     >
      <div className={s.styleInput}>
       <div className={s.sizeInput}>
        <TextField
         type="search"
         value={value}
         onChange={handleChange}
         placeholder={
          pathname === routeVacancy
           ? "Поиск по вакансиям"
           : pathname === routeAnonnsemend
           ? "Поиск по объявлениям"
           : "Поиск по анкетам"
         }
         sx={sxStyle.textfield}
        />
       </div>
       <img src={searchIcon} alt="search" />
      </div>
     </HeaderStylesWrapper>
    </div>
   </StylesFullScreen>

   <TabsComponentAds />

   <StylesFullScreen>
    <Outlet
     context={{
      isLoadingAds,
      isFetchingAds,
      setPageFu,
      refetchFu,
      dataAds: dataAds ?? storeListAds?.data,
      isLoadingVacancy,
      isFetchingVacancy,
      isSuccessVacancy,
      dataV: dataV ?? storeListVacancy,
      dataA: dataA ?? storeListAccount,
      isLoadingAccount,
      isFetchingAccount,
     }}
    />

    {(open || value) && (
     <FilterModalLayout
      style={{
       ...sxStyle.filterModalLayout,
       "& .MuiPaper-root": {
        background: mode === "dark" ? "#2a2a2a" : "#FDFDF5",
       },
      }}
      modalOpen={open}
      handleClose={handleClose}
     >
      <FilterFormsAds
       handleClose={handleClose}
       setPageFu={setPageFu}
       searchQuery={debouncedValue}
       filterState={filterState}
       setFilterStateFu={setFilterStateFu}
       setfilterON={setfilterON}
       originalArgsAds={originalArgsAds}
       originalArgsVacancy={originalArgsVacancy}
       originalArgsAccount={originalArgsAccount}
       defaultFilter={defaultFilter}
      />
     </FilterModalLayout>
    )}
   </StylesFullScreen>
  </>
 );
};
