import React, { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { styleSxTabsComponent } from "./styleSxTabsComponent";
import { RouteNames } from "../../../../core/router/RouteNames";
import { TabLinkElement } from "../../tabLinkElement/TabLinkElement";
import { useHandleEventBrowserGoToBack } from "../../../../hook/useHandleEventBrowserGoToBack";
import { useLocalStorage } from "../../../../hook/useLocalStorage";

export const TabsComponentOtherProfilePosts = () => {
 const [value, setValue] = React.useState("");
 let { state, pathname } = useLocation();
 const [goToBack, setGoToBack] = useLocalStorage("go-to-back", state ?? "");
 useHandleEventBrowserGoToBack(); // go to back (addEventListener) no tab

 useEffect(() => {
  pathname.includes(RouteNames.OTHER_USER_VACANCY)
   ? setValue(RouteNames.OTHER_USER_VACANCY)
   : pathname.includes(RouteNames.OTHER_USER_ADS)
   ? setValue(RouteNames.OTHER_USER_ADS)
   : pathname.includes(RouteNames.OTHER_USER_QUESTIONNAIRE)
   ? setValue(RouteNames.OTHER_USER_QUESTIONNAIRE)
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
};

interface TabLinkElementType {
 to: string;
 label: string;
}

const tabLinkElement: TabLinkElementType[] = [
 {
  to: "",
  label: "Новости",
 },
 {
  to: RouteNames.OTHER_USER_VACANCY,
  label: "Вакансии",
 },
 {
  to: RouteNames.OTHER_USER_ADS,
  label: "Объявления",
 },
 {
  to: RouteNames.OTHER_USER_QUESTIONNAIRE,
  label: "Анкеты",
 },
];
