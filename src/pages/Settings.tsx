import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowCanselImgIcon } from "../assets/icons/clearIcon.svg";
import { useAppDispatch } from "../core/redux/app/hooks";
import { logout } from "../modules/authorization/authSlice";
import { InButton } from "../common/ui-elements/button/InButton";
import { RouteNames } from "../core/router/RouteNames";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import cn from "classnames";
import s from "./styles/settings.module.scss";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { SwitchMui } from "../common/mui-element/Switch";
import { usePwaVersionAppQuery } from "../modules/pwa/pwaVersionQuery";
import { useLoginMutation } from "../modules/authorization/authQuery";
import { ContextTheme } from "../contextProvider/ThemeContext";
import { ColorModeContext } from "../contextProvider/MuiThemeContext";
import { ReactComponent as InfoIcon } from "../assets/icons/infoIcon.svg";
import { ReactComponent as LogOutIcon } from "../assets/icons/logOutIcon.svg";
import { ReactComponent as Moon } from "../assets/icons/moon.svg";
import { PWAinstall } from "../modules/pwa/PWAinstall";

export const Settings = () => {
 const dispatch = useAppDispatch();
 const logoutHandle = () => dispatch(logout());

 const { temeState, changeTheme }: any = useContext(ContextTheme);
 const { mode, toggleColorMode } = useContext(ColorModeContext);

 const [open, setOpen] = useState(false);
 const handleClickOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 const { data, isSuccess } = usePwaVersionAppQuery();
 // const [loginQuery, { data: loginData }] = useLoginMutation();
 // useEffect(() => {
 //  const loginData = {
 //   email: "ttt@ttt.ttt",
 //   password: "ttt",
 //  };
 //  loginQuery(loginData);
 // }, []);

 function changeTemeFu() {
  changeTheme(temeState === "light" ? "dark" : "light");
  toggleColorMode();
 }

 const [iosInstPWA, setIosInstPWA] = useState(false);
 const [supportsPWA, setSupportsPWA] = useState(false);
 const [promptInstall, setPromptInstall] = useState<any>(null);

 useEffect(() => {
  const handler = (e: any) => {
   e.preventDefault();
   setSupportsPWA(true);
   setPromptInstall(e);
  };
  window.addEventListener("beforeinstallprompt", handler);
 }, []);

 //a somewhat verbose approach to iOS detection
 function isThisDeviceRunningiOS() {
  if (
   ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
   )
  )
   return true;
  // iPad on iOS 13
  else if (navigator.userAgent.includes("Mac") && "ontouchend" in document) {
   return true;
  } else {
   return false;
  }
 }

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
  <StylesFullScreen>
   <HeaderStylesWrapper
    cancelImgIcon={
     <div className={s.customStyleSvg}>
      <ArrowCanselImgIcon />
     </div>
    }
    textLabel="Настройки"
   />

   <section className={s.mainSettings}>
    <div className={s.buttonVariant}>
     <div className={s.buttonAction}>
      <div className={s.title}>
       {/*<img src={moon} alt="moon" />*/}
       <Moon className={cn({ [s.forDarkIcons]: mode === "dark" })} />
       <p>Ночная тема</p>
      </div>

      <SwitchMui onClick={changeTemeFu} temeState={temeState} />
     </div>
     <a className={s.buttonAction} href="mailto:support@3-tone.ru">
      <div className={s.buttonAction}>
       <div className={s.title}>
        {/*<img src={infoIcon} alt="infoIcon" />*/}
        <InfoIcon className={cn({ [s.forDarkIcons]: mode === "dark" })} />
        <p>Написать в техподдержку</p>
       </div>
      </div>
     </a>
     {supportsPWA && (
      <div className={s.buttonAction} onClick={onInstallClick}>
       <div className={s.buttonAction}>
        <div className={s.title}>
         <LogOutIcon className={cn({ [s.forDarkIcons]: mode === "dark" })} />
         <p> Установить как приложение 2</p>
        </div>
       </div>
      </div>
     )}
     {iosInstPWA && <p>IOS instructions</p>}

     <p>{` ios devise =  ${isThisDeviceRunningiOS()}`}</p>

     {(iosInstPWA || supportsPWA) && <PWAinstall />}

     <div className={s.buttonAction} onClick={logoutHandle}>
      <div className={s.buttonAction}>
       <div className={s.title}>
        {/*<img src={logOutIcon} alt="logOutIcon" />*/}
        <LogOutIcon className={cn({ [s.forDarkIcons]: mode === "dark" })} />
        <p>Выйти</p>
       </div>
      </div>
     </div>
    </div>

    {isSuccess && (
     <div className={s.infoApps}>
      <Link to={RouteNames.LICENSE_SHOW}>Условия пользовательского соглашения</Link>
      <p>Версия приложения - {`${data[0]?.version}`}</p>
     </div>
    )}
   </section>
  </StylesFullScreen>
 );
};

//return (
//  <>
//      <ButtonInstallPwa />//
//    <PopUpNavigateGradient />
//  </>
//);
