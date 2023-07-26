import React, { useContext, useEffect, useState } from "react";
import { FilterModalLayout } from "../../common/layout/filterModalLayout/FilterModalLayout";
import { sxStyle } from "../../pages/styles/sx";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "../../pages/styles/settings.module.scss";
import { ReactComponent as LogOutIcon } from "../../assets/icons/logOutIcon.svg";
import { isThisDeviceRunningiOS } from "./isThisDeviceRunningiOS";
import { PwaInstall } from "../../contextProvider/PwaInstallContext";

interface PWAinstallType {
 handleClickOpen: () => void;
}

export const PWAinstall = () => {
 const { supportsPWA, promptInstall, setSupportsPWA, setPromptInstall, Pwa, notHaveForms }: any =
  useContext(PwaInstall);
 const { mode } = useContext(ColorModeContext);

 const [open, setOpen] = useState(false);
 const handleClickOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 const [iosInstPWA, setIosInstPWA] = useState(false);

 useEffect(() => {
  const handler = (e: any) => {
   e.preventDefault();
   setSupportsPWA(true);
   setPromptInstall(e);
  };
  window.addEventListener("beforeinstallprompt", handler);
 }, []);

 const onInstallClick = () => {
  if (!supportsPWA) {
   alert("Either you have already installed the app or your browser does not support PWA :(");
   return;
  } else if (isThisDeviceRunningiOS()) {
   setIosInstPWA((prev) => !prev);
   return;
  } else promptInstall.prompt();
 };

 return (
  <>
   {(supportsPWA || isThisDeviceRunningiOS()) && (
    <div className={s.buttonAction} onClick={onInstallClick}>
     <div className={s.buttonAction}>
      <div className={s.title}>
       <LogOutIcon className={cn({ [s.forDarkIcons]: mode === "dark" })} />
       <p> Установить как приложение PWAinstall</p>
      </div>
     </div>
    </div>
   )}
  </>
 );

 //<FilterModalLayout
 // style={{
 //  ...sxStyle.filterModalLayout,
 //  "& .MuiPaper-root": {
 //   background: mode === "dark" ? "#2a2a2a" : "#FDFDF5",
 //  },
 // }}
 // modalOpen={open}
 // handleClose={handleClose}
 //>
 // <p>ffdddddddddf</p>
 //</FilterModalLayout>
};
