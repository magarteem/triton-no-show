import React, { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { styleSxTabsComponent } from "./styleSxTabsComponent";
import { RouteNames } from "../../../../core/router/RouteNames";
import { useHandleEventBrowserGoToBack } from "../../../../hook/useHandleEventBrowserGoToBack";
import { TabLinkElement } from "../../tabLinkElement/TabLinkElement";

const incoming = `${RouteNames.NOTIFICATION}/${RouteNames.IN_COMING_NOTIFICATION}`;

export const TabsComponent = () => {
 const [value, setValue] = React.useState("");
 let { pathname } = useLocation();
 useHandleEventBrowserGoToBack(); // go to back (addEventListener) no tab

 useEffect(() => {
  pathname === incoming ? setValue("incoming") : setValue("");
 }, [pathname]);

 const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);

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
  label: "Отправленные",
 },
 {
  to: RouteNames.IN_COMING_NOTIFICATION,
  label: "Входящие",
 },
];
