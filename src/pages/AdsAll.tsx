import { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import filterIconsNew from "../assets/icons/filterIconsNew.svg";
import searchIcon from "../assets/icons/searchIcon.svg";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { TabsComponentAds } from "../common/components/ads/tabsComponentAds/TabsComponentAds";
import { useAppSelector } from "../core/redux/app/hooks";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { FilterModalLayout } from "../common/layout/filterModalLayout/FilterModalLayout";
import { FilterFormsAds } from "../modules/ads/FilterFormsAds";
import { AdsFilterParamsRequestType, VacancyFilterParamsRequestType } from "../modules/vacancy/types/FilterFormsAdsFieldsType";
import { ResponseAdsType } from "../modules/ads/types/responseAdsType";
import { useListAdsQuery, useListVacancyQuery } from "../modules/vacancy/adsQuery";
import { useListAccountQuery } from "../modules/user/getGetMyProfileQuery";
import { FilterSearchAllFormsType } from "../modules/user/types/filterSearchAllFormsType";
import { ResponseSearchAllFormsType } from "../modules/user/types/responseSearchAllForms";
import { useDebounce } from "../hook/useDebiunce";
import { routeAccount, routeAnonnsemend, routeVacancy } from "../modules/ads/service/routesVariableForAds";
import { useDefaultQueryAds } from "../modules/ads/hooks/useDefaultQueryAds";
import { sxStyle } from "./styles/sx";
import s from "./styles/adsAll.module.scss";
import { visitLexicalEnvironment } from "typescript";

const defaultState = { page: 0 };
const defaultStateRefetch = { page: 0, pageSize: 10 };

export const AdsAll = () => {
  let location = useLocation().pathname;
  const adsData = useAppSelector((state) => state.adsSliceReducer);
  const myProfile = useAppSelector((state) => state.userSliceReducer.profileData);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //! --- ADS -------------------------------
  const storeListAds = useAppSelector((state) => state.adsQuery.queries.listAds?.data) as ResponseAdsType;
  const [pageparamsAds, setPageparamsAds] = useState<AdsFilterParamsRequestType>(defaultState);
  const {
    data: dataAds,
    isLoading: isLoadingAds,
    isFetching: isFetchingAds,
  } = useListAdsQuery(pageparamsAds, {
    skip: location !== routeAnonnsemend,
  });

  //! --- ACCOUNT -------------------------------
  const storeListAccount = useAppSelector((state) => state.getMyProfileQuery.queries.listAccount?.data) as ResponseSearchAllFormsType;
  const [pageparamsAccount, setPageparamsAccount] = useState<FilterSearchAllFormsType>(defaultState);
  const {
    data: dataA,
    isLoading: isLoadingAccount,
    isFetching: isFetchingAccount,
  } = useListAccountQuery(pageparamsAccount, {
    skip: location !== routeAccount,
  });

  //! --- VACANCY -------------------------------
  const storeListVacancy = useAppSelector((state) => state.adsQuery.queries.listVacancy?.data) as ResponseAdsType;
  const [pageparamsVacancy, setPageparamsVacancy] = useState<VacancyFilterParamsRequestType>(defaultState);
  const {
    data: dataV,
    isLoading: isLoadingVacancy,
    isFetching: isFetchingVacancy,
  } = useListVacancyQuery(pageparamsVacancy, {
    skip: location !== routeVacancy,
  });

  //! --- search -------------------------------
  const [value, setValue] = useState<string | null>(null);
  const debouncedValue = useDebounce<string | null>(value, 500);

  const { defaultListVacancy, defaultListAds, defaultListAccount } = useDefaultQueryAds();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const setPageFu = (params: AdsFilterParamsRequestType | VacancyFilterParamsRequestType | FilterSearchAllFormsType) => {
    if (location === routeVacancy) {
      if (params) setPageparamsVacancy({ ...params });
      else {
        setPageparamsVacancy({
          ...pageparamsVacancy,
          page: dataV ? dataV.currentPage + 1 : 0,
        });
      }
    } else if (location === routeAnonnsemend) {
      if (params) setPageparamsAds({ ...params });
      else {
        setPageparamsAds({
          ...pageparamsAds,
          page: dataAds ? dataAds.currentPage + 1 : 0,
        });
      }
    } else {
      if (params) setPageparamsAccount({ ...params });
      else {
        setPageparamsAccount({
          ...pageparamsAccount,
          page: dataA ? dataA.currentPage + 1 : 0,
        });
      }
    }
  };

  //! ----------------------------------
  const refetchFu = () => {
    //console.log("cl");
    //setValue(null);
    if (location === routeVacancy) {
      defaultListVacancy();
      setPageparamsVacancy(defaultStateRefetch);
    } else if (location === routeAnonnsemend) {
      defaultListAds();
      setPageparamsAds(defaultStateRefetch);
    } else {
      defaultListAccount();
      setPageparamsAccount(defaultStateRefetch);
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
          <HeaderStylesWrapper anyIconsFirst={{ img: filterIconsNew, action: location }} onClickAnyIconsFirst={handleClickOpen}>
            <div className={s.styleInput}>
              <div className={s.sizeInput}>
                <TextField
                  value={value}
                  onChange={handleChange}
                  placeholder={
                    location === routeVacancy ? "Поиск по вакансиям" : location === routeAnonnsemend ? "Поиск по объявлениям" : "Поиск по анкетам"
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
          context={[
            adsData,
            myProfile,
            isLoadingAds,
            isFetchingAds,
            setPageFu,
            refetchFu,
            dataAds ?? storeListAds,
            isLoadingVacancy,
            isFetchingVacancy,
            dataV ?? storeListVacancy,
            dataA ?? storeListAccount,
            isLoadingAccount,
            isFetchingAccount,
          ]}
        />

        {(open || value) && (
          <FilterModalLayout style={sxStyle.filterModalLayout} modalOpen={open} handleClose={handleClose}>
            <FilterFormsAds handleClose={handleClose} setPageFu={setPageFu} searchQuery={debouncedValue} />
          </FilterModalLayout>
        )}
      </StylesFullScreen>
    </>
  );
};
