import { Tab, Tabs } from "@mui/material";
import { styleSxTabsComponent } from "./styleSxTabsComponent";

interface TabsComponentType {
 activeNotifiPage: number;
 setActiveNotifiPage: (a: any) => any;
}

export const TabsComponent = ({ activeNotifiPage, setActiveNotifiPage }: TabsComponentType) => {
 const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setActiveNotifiPage(newValue);
 };

 return (
  <Tabs
   value={activeNotifiPage}
   onChange={handleChange}
   aria-label="secondary tabs example"
   sx={styleSxTabsComponent.tabs}
  >
   <Tab label="Отправленные" sx={styleSxTabsComponent.tab} />
   <Tab label="Входящие" sx={styleSxTabsComponent.tab} />
  </Tabs>
 );
};
