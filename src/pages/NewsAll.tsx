import { useState, useEffect, useContext } from "react";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { ReactComponent as AddIcons } from "../assets/icons/addIcons.svg";
import { ReactComponent as FilterIconsNew } from "../assets/icons/filterIconsNew.svg";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { useOutletContext } from "react-router-dom";
import { RibbonLayout } from "../common/layout/ribbonLayout/RibbonLayout";
import { RouteNames } from "../core/router/RouteNames";
import { CardsNewsItemPreview } from "../common/components/timeLine/cardsNewsItemPreview/CardsNewsItemPreview";
import { FilterModalLayout } from "../common/layout/filterModalLayout/FilterModalLayout";
import { FilterFormsTimeLine } from "../modules/timeLine/FilterFormsTimeLine";
import { NewsResultType, ResponseNewsType } from "../modules/timeLine/types/responseNewsType";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import {
 FilterFormsTimeLineFieldsType,
 FilterParamsRequestType,
} from "../modules/timeLine/types/FilterFormsTimeLineFieldsType";
import { useAppSelector } from "../core/redux/app/hooks";
import { InButton } from "../common/ui-elements/button/InButton";
import { CheckMyHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";
import { ColorModeContext } from "../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "./styles/newsAll.module.scss";

const defaultFilter = {
 search_text: "",
 type_category: null,
 city: null,
 tools: [],
 genre: [],
};

interface OutletType {
 data: NewsResultType[];
 isLoading: boolean;
 isFetching: boolean;
 setPageFu: (paramsQuery?: FilterParamsRequestType) => void;
 refetchFu: () => void;
 myProfileKey: string[];
 originalArgs: any;
 filterON: boolean;
 setfilterON: (state: boolean) => void;
}

export const NewsAll = () => {
 const { mode } = useContext(ColorModeContext);
 const { notHaveForms, handleOpen }: any = useContext(CheckMyHaveAccountContext);
 const stopeListAds = useAppSelector(
  (state) => state.getNewsListQuery.queries.infinityScrollNews?.data
 ) as ResponseNewsType;

 const {
  data,
  isLoading,
  isFetching,
  setPageFu,
  refetchFu,
  myProfileKey,
  originalArgs,
  filterON,
  setfilterON,
 }: OutletType = useOutletContext();

 const [filerstate, setFilerstate] = useState<FilterFormsTimeLineFieldsType>(defaultFilter);
 const [open, setOpen] = useState(false);
 const handleClickOpen = () => setOpen(true);
 const handleClickshowModal = () => notHaveForms && handleOpen();
 const handleClose = () => setOpen(false);
 const setFilterStateFu = (data: FilterFormsTimeLineFieldsType) => setFilerstate(data);

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
    <HeaderStylesWrapper
     textLabel="Лента"
     anyIconsFirst={{ img: <AddIcons />, action: notHaveForms ? "" : RouteNames.ADD_NEW_NEWS }}
     anyIconsSecond={{
      img: <FilterIconsNew className={cn({ [s.svgNode]: filterON })} />,
      action: "",
     }}
     anyIconsSecondActivSpecified={filterON}
     onClickAnyIconsFirst={handleClickshowModal}
     onClickAnyIconsSecond={handleClickOpen}
    />

    {isLoading ? (
     <PreLoader />
    ) : (
     <RibbonLayout setPageFu={setPageFu} isFetching={isFetching}>
      {data?.length > 0 ? (
       data?.map((x) => (
        <CardsNewsItemPreview itemDataNews={x} key={x.id} myProfileKey={myProfileKey} />
       ))
      ) : stopeListAds?.results?.length > 0 ? (
       stopeListAds?.results.map((x) => (
        <CardsNewsItemPreview itemDataNews={x} key={x.id} myProfileKey={myProfileKey} />
       ))
      ) : (
       <InButton
        textButton="Ничего не найдено. Назад"
        isValidInButton={false}
        onClick={refetchFu}
       />
      )}
     </RibbonLayout>
    )}
   </StylesFullScreen>

   {open && (
    <FilterModalLayout
     style={{
      "& .MuiDialog-container": {
       alignItems: "flex-end",
       overscrollBehavior: "contain",

       "& .MuiPaper-root": {
        background: mode === "light" ? "#FDFDF5" : "#2a2a2a",
        borderRadius: "28px 28px 0px 0px",
        width: "100%",
        margin: 0,
        padding: "16px",
       },
      },
     }}
     modalOpen={open}
     handleClose={handleClose}
    >
     <FilterFormsTimeLine
      handleClose={handleClose}
      filerstate={filerstate}
      defaultFilter={defaultFilter}
      setFilterStateFu={setFilterStateFu}
      setfilterON={setfilterON}
      originalArgs={originalArgs}
     />
    </FilterModalLayout>
   )}

   {/*<PopUpNavigateGradient />*/}
  </>
 );
};
