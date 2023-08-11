import { useRef, useState } from "react";
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
import { OutgoingNotification } from "./outgoingNotification/OutgoingNotification";
import { IncomingNotification } from "./incomingNotification/IncomingNotification";

const routL = RouteNames.NOTIFICATION;
const routR = `${RouteNames.NOTIFICATION}/${RouteNames.IN_COMING_NOTIFICATION}`;

export const NotificationSwitchTabs = () => {
 const refs = useRef<HTMLDivElement | null>(null);

 const [activeNotifiPage, setActiveNotifiPage] = useState(0);
 const [outgoingPage, setOutgoingPage] = useState({ page: 0 });
 const [incomingPage, setIncoming] = useState({ page: 0 });
 useSwipeHandleTouch(refs, routL, routR, setActiveNotifiPage);

 const {
  data: dataOutgoing,
  isLoading: isLoadingOutgoing,
  isFetching: isFetchingOutgoing,
 } = useListOutgoingQuery(outgoingPage, {
  skip: activeNotifiPage !== 0,
 });

 const {
  data: dataIncoming,
  isLoading: isLoadingIncoming,
  isFetching: isFetchingIncoming,
 } = useListIncomingQuery(incomingPage, {
  skip: activeNotifiPage !== 1,
 });

 const setPageFu = () => {
  if (activeNotifiPage === 0) {
   dataOutgoing && setOutgoingPage({ page: dataOutgoing.currentPage + 1 });
  } else dataIncoming && setIncoming({ page: dataIncoming.currentPage + 1 });
 };

 return (
  <>
   <StylesFullScreen>
    <HeaderStylesWrapper textLabel="Запросы" />
   </StylesFullScreen>
   <TabsComponent activeNotifiPage={activeNotifiPage} setActiveNotifiPage={setActiveNotifiPage} />
   <StylesFullScreen>
    {isLoadingOutgoing || isLoadingIncoming ? (
     <PreLoader />
    ) : (
     <div ref={refs}>
      <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingOutgoing || isFetchingIncoming}>
       {activeNotifiPage === 0 ? (
        <OutgoingNotification dataOutgoing={dataOutgoing} />
       ) : (
        <IncomingNotification dataIncoming={dataIncoming} />
       )}
      </RibbonLayout>
     </div>
    )}
   </StylesFullScreen>
  </>
 );
};
