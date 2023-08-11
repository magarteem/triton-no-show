import { Tab, Tabs } from "@mui/material";
<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import { styleSxTabsComponent } from "./styleSxTabsComponent";
import { RouteNames } from "../../../../core/router/RouteNames";
import { useHandleEventBrowserGoToBack } from "../../../../hook/useHandleEventBrowserGoToBack";
import { TabLinkElement } from "../../tabLinkElement/TabLinkElement";
=======
import { styleSxTabsComponent } from "./styleSxTabsComponent";
>>>>>>> new-tabs-1

interface TabsComponentType {
 activeNotifiPage: number;
 setActiveNotifiPage: (a: any) => any;
}

<<<<<<< HEAD
export const TabsComponent = () => {
 const [value, setValue] = React.useState("");
 let { pathname } = useLocation();
 useHandleEventBrowserGoToBack(); // go to back (addEventListener) no tab

 useEffect(() => {
  pathname === incoming ? setValue("incoming") : setValue("");
 }, [pathname]);

 const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);
=======
export const TabsComponent = ({ activeNotifiPage, setActiveNotifiPage }: TabsComponentType) => {
 const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setActiveNotifiPage(newValue);
 };
>>>>>>> new-tabs-1

 return (
  <Tabs
   value={activeNotifiPage}
   onChange={handleChange}
   aria-label="secondary tabs example"
   sx={styleSxTabsComponent.tabs}
  >
<<<<<<< HEAD
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
=======
   <Tab label="Отправленные" sx={styleSxTabsComponent.tab} />
   <Tab label="Входящие" sx={styleSxTabsComponent.tab} />
>>>>>>> new-tabs-1
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
