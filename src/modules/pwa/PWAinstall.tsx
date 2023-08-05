import { useContext, useState } from "react";
import { FilterModalLayout } from "../../common/layout/filterModalLayout/FilterModalLayout";
import { sxStyle } from "../../pages/styles/sx";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";
import { ReactComponent as LogOutIcon } from "../../assets/icons/logOutIcon.svg";
import { PWAinstallContextType, PwaInstall } from "../../contextProvider/PwaInstallContext";
import iosAddToHomeScreen from "../../assets/icons/iosAddToHomeScreen.webp";
import pwaIconMaskable from "../../assets/icons/pwaIconMaskable.webp";
import cn from "classnames";
import s from "./pwaInstall/pwa.module.scss";

export const PWAinstall = () => {
 const { mode } = useContext(ColorModeContext);
 let { supportsPWA, promptInstall, isThisDeviceRunningiOS, setSupportsPWA }: PWAinstallContextType =
  useContext(PwaInstall);
 const [iosInstPWA, setIosInstPWA] = useState(false);
 const handleClose = () => setIosInstPWA(false);

 const onInstallClickForAndroid = async () => {
  if (supportsPWA && promptInstall) {
   promptInstall.prompt();
   const { outcome } = await promptInstall.userChoice;
   if (outcome === "accepted") {
    setSupportsPWA(false);
   }
  } else alert("Либо вы уже установили приложение, либо ваш браузер не поддерживает PWA.");
 };

 const onInstallClickForIOS = () => isThisDeviceRunningiOS && setIosInstPWA(true);

 return (
  <>
   {(supportsPWA || isThisDeviceRunningiOS) && (
    <div
     className={s.buttonAction}
     onClick={supportsPWA ? onInstallClickForAndroid : onInstallClickForIOS}
    >
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
       <h1>Установить приложение</h1>
      </div>
      <div className={s.mainPwa}>
       <h3>
        Установите приложение на своё устройство, чтобы легко получить к нему доступ в любое время.
        Нет магазина приложений. Нет загрузки. Никаких хлопот
       </h3>
       <p className={cn(s.pwaInstructions, s.positionImg)}>
        1) В браузере <span> Safari </span> нажмите:
        <img src={iosAddToHomeScreen} alt="iosAddToHomeScreen" />
       </p>
       <p className={s.pwaInstructions}>
        2) Выберите: <span>На экран «Домой»</span>
       </p>
      </div>
     </div>
    </FilterModalLayout>
   )}
  </>
 );
};
