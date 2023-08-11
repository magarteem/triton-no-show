import { useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TabsComponent } from "./tabsComponent/TabsComponent";
import { HeaderStylesWrapper } from "../../layout/headerStylesWrapper/HeaderStylesWrapper";
import { RibbonLayout } from "../../layout/ribbonLayout/RibbonLayout";
import { StylesFullScreen } from "../../layout/stylesFullScreen/StylesFullScreen";
import {
 useListIncomingQuery,
 useListOutgoingQuery,
} from "../../../modules/notification/notificationQuery";
import { RouteNames } from "../../../core/router/RouteNames";
import { PreLoader } from "../preLoader/PreLoader";
import { useSwipeHandleTouch } from "../../../hook/useSwipeHandleTouch";

const routL = RouteNames.NOTIFICATION;
const routR = `${RouteNames.NOTIFICATION}/${RouteNames.IN_COMING_NOTIFICATION}`;

export const NotificationSwitchTabs = () => {
 const refs = useRef<HTMLDivElement | null>(null);
 useSwipeHandleTouch(refs, routL, routR);

 const { pathname } = useLocation();
 const [outgoingPage, setOutgoingPage] = useState({ page: 0 });
 const [incomingPage, setIncoming] = useState({ page: 0 });

 const {
  data: dataOutgoing,
  isLoading: isLoadingOutgoing,
  isFetching: isFetchingOutgoing,
 } = useListOutgoingQuery(outgoingPage, {
  skip: pathname !== routL,
 });

 const {
  data: dataIncoming,
  isLoading: isLoadingIncoming,
  isFetching: isFetchingIncoming,
 } = useListIncomingQuery(incomingPage, {
  skip: pathname !== routR,
 });

 const setPageFu = () => {
  if (pathname === routL) {
   dataOutgoing && setOutgoingPage({ page: dataOutgoing.currentPage + 1 });
  } else dataIncoming && setIncoming({ page: dataIncoming.currentPage + 1 });
 };

 return (
  <>
   <StylesFullScreen>
    {/*<HeaderStylesWrapper textLabel="Запросы" anyIconsFirst={search} anyIconsSecond={filter} />*/}
    <HeaderStylesWrapper textLabel="Запросы" />
   </StylesFullScreen>
   <TabsComponent />
   <StylesFullScreen>
    {isLoadingOutgoing || isLoadingIncoming ? (
     <PreLoader />
    ) : (
     <div ref={refs}>
      <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingOutgoing || isFetchingIncoming}>
       <Outlet context={{ dataOutgoing, dataIncoming }} />
      </RibbonLayout>
     </div>
    )}
   </StylesFullScreen>
  </>
 );
};
