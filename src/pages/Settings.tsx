import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowCanselImgIcon } from "../assets/icons/clearIcon.svg";
import moon from "../assets/icons/moon.svg";
import infoIcon from "../assets/icons/infoIcon.svg";
import logOutIcon from "../assets/icons/logOutIcon.svg";
import { useAppDispatch } from "../core/redux/app/hooks";
import { logout } from "../modules/authorization/authSlice";
import { InButton } from "../common/ui-elements/button/InButton";
import { RouteNames } from "../core/router/RouteNames";
import { ButtonInstallPwa } from "../modules/pwa/ButtonInstallPwa";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import s from "./styles/settings.module.scss";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { SwitchMui } from "../common/mui-element/Switch";
import { usePWAInstall } from "react-use-pwa-install";
import { usePwaVersionAppQuery } from "../modules/pwa/pwaVersionQuery";
import { useLoginMutation } from "../modules/authorization/authQuery";

export const Settings = () => {
 const install = usePWAInstall();
 const dispatch = useAppDispatch();
 const logoutHandle = () => dispatch(logout());

 const { data, isSuccess } = usePwaVersionAppQuery();
 // const [loginQuery, { data: loginData }] = useLoginMutation();
 // useEffect(() => {
 //  const loginData = {
 //   email: "ttt@ttt.ttt",
 //   password: "ttt",
 //  };
 //  loginQuery(loginData);
 // }, []);

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
     {/*<div className={s.buttonAction}>
      <div className={s.title}>
       <img src={moon} alt="moon" />
       <p>Ночная тема</p>
      </div>

      <SwitchMui />
     </div>*/}

     <a className={s.buttonAction} href="mailto:support@3-tone.ru">
      <div className={s.buttonAction}>
       <div className={s.title}>
        <img src={infoIcon} alt="infoIcon" />
        <p>Написать в техподдержку</p>
       </div>
      </div>
     </a>

     {install && (
      <div className={s.buttonAction} onClick={install}>
       <div className={s.buttonAction}>
        <div className={s.title}>
         <img src={logOutIcon} alt="logOutIcon" /> <p> Установить как приложение</p>{" "}
        </div>
       </div>
      </div>
     )}

     <div className={s.buttonAction} onClick={logoutHandle}>
      <div className={s.buttonAction}>
       <div className={s.title}>
        <img src={logOutIcon} alt="logOutIcon" />
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
//    <div className={s.settings}>
//      <Link className={s.styleBtn} onClick={logoutHandle} to={RouteNames.LOGIN}>
//        <InButton textButton="Выход" />
//      </Link>
//      <Link className={s.styleBtn} to={RouteNames.USER}>
//        <InButton textButton="Назад" />
//      </Link>
//      <ButtonInstallPwa />
//    </div>
//    <PopUpNavigateGradient />
//  </>
//);
