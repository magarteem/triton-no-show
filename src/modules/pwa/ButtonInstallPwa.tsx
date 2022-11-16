import React, { useEffect, useState } from "react";
import s from "./pwa.module.scss";

export const ButtonInstallPwa = () => {
 const [supportsPWA, setSupportsPWA] = useState(false);
 const [promptInstall, setPromptInstall] = useState(null);

 useEffect(() => {
  const handler = (e: any) => {
   e.preventDefault();
   console.log("we are being triggered :D");
   setSupportsPWA(true);
   setPromptInstall(e);
  };
  window.addEventListener("beforeinstallprompt", handler);

  return () =>
   window.removeEventListener("transitionend", handler);
 }, []);

 const onClick = (evt: any) => {
  evt.preventDefault();
  if (!promptInstall) {
   return;
  }
  //@ts-ignore
  promptInstall.prompt();
 };
 if (!supportsPWA) {
  return null;
 }
 return (
  <>
   <h1>Install</h1>
   <button
    className={s.pwa}
    id="setup_button"
    aria-label="Install app"
    title="Install app"
    onClick={onClick}
   >
    Установить как приложение
   </button>
  </>
 );
};
