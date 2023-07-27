import React, { useContext, useState } from "react";
import { FilterModalLayout } from "../../common/layout/filterModalLayout/FilterModalLayout";
import { sxStyle } from "../../pages/styles/sx";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";
import clearIcon from "../../assets/icons/clearIcon.svg";
import cn from "classnames";
import s from "./pwa.module.scss";
import { ReactComponent as LogOutIcon } from "../../assets/icons/logOutIcon.svg";
import { PwaInstall } from "../../contextProvider/PwaInstallContext";
import iosAddToHomeScreen from "../../assets/icons/iosAddToHomeScreen.webp";
import pwaIconMaskable from "../../assets/icons/pwaIconMaskable.webp";

export const PWAinstall = () => {
 const { supportsPWA, promptInstall, isThisDeviceRunningiOS }: any = useContext(PwaInstall);
 const { mode } = useContext(ColorModeContext);

 const [iosInstPWA, setIosInstPWA] = useState(false);
 const handleClose = () => setIosInstPWA(false);

 const onInstallClick = () => {
  if (!supportsPWA) {
   alert("Либо вы уже установили приложение, либо ваш браузер не поддерживает PWA.");
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
       <p> Установить как приложение</p>
      </div>
     </div>
    </div>
   )}

   {iosInstPWA && (
    <FilterModalLayout
     style={{
      ...sxStyle.filterModalLayout,
      "& .MuiPaper-root": {
       background: mode === "dark" ? "#2a2a2a" : "#FDFDF5",
      },
     }}
     modalOpen={iosInstPWA}
     handleClose={handleClose}
    >
     <div className={s.iosPwaInstall}>
      <div className={s.header}>
       <img src={pwaIconMaskable} alt="pwaIconMaskable" />
       <h1>Install Progressiver</h1>
      </div>
      <div className={s.mainPwa}>
       <h3>
        Установите приложение на своё устройство, чтобы легко получить к нему доступ в любое время.
        Нет магазина приложений. Нет загрузки. Никаких хлопот
       </h3>
       <p className={cn(s.pwaInstructions, s.positionImg)}>
        1) нажать: <img src={iosAddToHomeScreen} alt="iosAddToHomeScreen" />
       </p>
       <p className={s.pwaInstructions}>
        2) выберите <span>добавить на главный экран</span>:
       </p>
      </div>
      <button className={s.closeButton} onClick={handleClose}>
       <img src={clearIcon} alt="back" />
      </button>
     </div>
    </FilterModalLayout>
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
