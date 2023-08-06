import React, { memo, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styleSxTabsComponent } from "./styleSxTabsComponent";
import { RouteNames } from "../../../../core/router/RouteNames";
import {
 routeAccount,
 routeAnonnsemend,
} from "../../../../modules/ads/service/routesVariableForAds";
//import { useHandleEventBrowserGoToBack } from "../../../../hook/useHandleEventBrowserGoToBack";
import { TabLinkElement } from "../../tabLinkElement/TabLinkElement";
import { useCheckSwipeDevises } from "../../../../hook/checkSwipeDevises";

export const TabsComponentAds = memo(() => {
 const [value, setValue] = React.useState("");
 let { pathname, state } = useLocation();
 const navigate = useNavigate();
 // useHandleEventBrowserGoToBack(); // go to back (addEventListener) no tab
 console.log(useCheckSwipeDevises());

 useEffect(() => {
  pathname === routeAnonnsemend
   ? setValue(RouteNames.ADS_LIST)
   : pathname === routeAccount
   ? setValue(RouteNames.ADS_QUESTIONNAIRE_LIST)
   : setValue("");
 }, [pathname]);

 const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);

 // const handlePopstate = (e: PopStateEvent) => {
 //  console.log("222222222", e);
 //  e.preventDefault();

 //  if (state) navigate(state.from);
 //  else navigate(RouteNames.HOME);
 // };

 window.onpopstate = (e: PopStateEvent) =>
  setTimeout(() => {
   if (state) navigate(state.from);
   else navigate(RouteNames.HOME);
  }, 0);

 // useEffect(() => {
 //  window.addEventListener("popstate", handlePopstate);
 //  return () => {
 //   window.removeEventListener("popstate", handlePopstate);
 //  };
 // }, []);

 return (
  <Tabs
   value={value}
   onChange={handleChange}
   textColor="primary"
   indicatorColor="secondary"
   aria-label="secondary tabs example"
   sx={styleSxTabsComponent.tabs}
  >
   {tabLinkElement.map((x) => (
    <Tab
     key={x.to}
     value={x.to}
     label={x.label}
     sx={styleSxTabsComponent.tab}
     onClick={() => setValue(x.to)}
     component={TabLinkElement({ href: x.to })}
    />
   ))}
  </Tabs>
 );
});

interface TabLinkElementType {
 to: string;
 label: string;
}

const tabLinkElement: TabLinkElementType[] = [
 {
  to: "",
  label: "Вакансии",
 },
 {
  to: RouteNames.ADS_LIST,
  label: "Объявления",
 },
 {
  to: RouteNames.ADS_QUESTIONNAIRE_LIST,
  label: "Анкеты",
 },
];
