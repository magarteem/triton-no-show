import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TabsComponent } from "./tabsComponent/TabsComponent";
import { HeaderStylesWrapper } from "../../layout/headerStylesWrapper/HeaderStylesWrapper";
import { RibbonLayout } from "../../layout/ribbonLayout/RibbonLayout";
import { StylesFullScreen } from "../../layout/stylesFullScreen/StylesFullScreen";
import { useListIncomingQuery, useListOutgoingQuery } from "../../../modules/notification/notificationQuery";
import { RouteNames } from "../../../core/router/RouteNames";
import { PreLoader } from "../preLoader/PreLoader";
import { useHandleTouch } from "../../../modules/notification/hook/useHandleTouchMove";

const routOut = RouteNames.NOTIFICATION;
const routeIn = `${RouteNames.NOTIFICATION}/${RouteNames.IN_COMING_NOTIFICATION}`;

export const NotificationSwitchTabs = () => {
  const touchFu = useHandleTouch();
  let location = useLocation().pathname;
  const [outgoingPage, setOutgoingPage] = useState({ page: 0 });
  const [incomingPage, setIncoming] = useState({ page: 0 });

  const {
    data: dataOutgoing,
    isLoading: isLoadingOutgoing,
    isFetching: isFetchingOutgoing,
  } = useListOutgoingQuery(outgoingPage, {
    skip: location !== routOut,
  });

  const {
    data: dataIncoming,
    isLoading: isLoadingIncoming,
    isFetching: isFetchingIncoming,
  } = useListIncomingQuery(incomingPage, {
    skip: location !== routeIn,
  });

  const setPageFu = () => {
    if (location === routOut) {
      dataOutgoing && setOutgoingPage({ page: dataOutgoing.currentPage + 1 });
    } else dataIncoming && setIncoming({ page: dataIncoming.currentPage + 1 });
  };

  const handleTouchStart = (e: React.TouchEvent) => touchFu("start", e);
  const handleTouchMove = (e: React.TouchEvent) => touchFu("move", e);

  return (
    <>
      <StylesFullScreen>
        {/*<HeaderStylesWrapper textLabel="Запросы" anyIconsFirst={search} anyIconsSecond={filter} />*/}
        <HeaderStylesWrapper textLabel="Запросы" />
      </StylesFullScreen>
      <TabsComponent />
      <StylesFullScreen>
        <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          {isLoadingOutgoing || isLoadingIncoming ? (
            <PreLoader />
          ) : (
            <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingOutgoing || isFetchingIncoming}>
              <Outlet context={[dataOutgoing, isLoadingOutgoing, dataIncoming, isLoadingIncoming]} />
            </RibbonLayout>
          )}
        </div>
      </StylesFullScreen>
    </>
  );
};
