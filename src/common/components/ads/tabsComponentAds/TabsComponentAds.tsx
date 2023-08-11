import React, { memo, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { styleSxTabsComponent } from "./styleSxTabsComponent";
import { RouteNames } from "../../../../core/router/RouteNames";
import {
 routeAccount,
 routeAnonnsemend,
} from "../../../../modules/ads/service/routesVariableForAds";
import { useHandleEventBrowserGoToBack } from "../../../../hook/useHandleEventBrowserGoToBack";
import { TabLinkElement } from "../../tabLinkElement/TabLinkElement";
import { useLocalStorage } from "../../../../hook/useLocalStorage";

export const TabsComponentAds = memo(() => {
 const [value, setValue] = React.useState("");
 let { pathname, state } = useLocation();
 const [goToBack, setGoToBack] = useLocalStorage("go-to-back", state ?? "");
 useHandleEventBrowserGoToBack(); // go to back (addEventListener) no tab

 useEffect(() => {
  pathname === routeAnonnsemend
   ? setValue(RouteNames.ADS_LIST)
   : pathname === routeAccount
   ? setValue(RouteNames.ADS_QUESTIONNAIRE_LIST)
   : setValue("");
 }, [pathname]);

 useEffect(() => {
  return () => {
   setGoToBack(state ? state.from : pathname);
  };
 }, [state]);

 const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  setValue(newValue);
 };

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
