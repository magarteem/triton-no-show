import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowCanselImgIcon } from "../assets/icons/clearIcon.svg";
import { useAppDispatch } from "../core/redux/app/hooks";
import { logout } from "../modules/authorization/authSlice";
import { RouteNames } from "../core/router/RouteNames";
import cn from "classnames";
import s from "./styles/settings.module.scss";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { SwitchMui } from "../common/mui-element/Switch";
import { usePwaVersionAppQuery } from "../modules/pwa/pwaVersionQuery";
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
 const { data, isSuccess } = usePwaVersionAppQuery();

 function changeTemeFu() {
  changeTheme(temeState === "light" ? "dark" : "light");
  toggleColorMode();
 }

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

     <PWAinstall />

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
