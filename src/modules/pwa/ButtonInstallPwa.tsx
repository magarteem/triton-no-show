import { usePWAInstall } from "react-use-pwa-install";
import s from "./pwa.module.scss";

export const ButtonInstallPwa = () => {
 const install = usePWAInstall();
 // const [supportsPWA, setSupportsPWA] = useState(false);
 // const [promptInstall, setPromptInstall] = useState(null);

 // useEffect(() => {
 //  const handler = (e: any) => {
 //   e.preventDefault();
 //   console.log("we are being triggered :D");
 //   setSupportsPWA(true);
 //   setPromptInstall(e);
 //  };
 //  window.addEventListener("beforeinstallprompt", handler);

 //  return () =>
 //   window.removeEventListener("transitionend", handler);
 // }, []);

 // const onClick = (evt: any) => {
 //  evt.preventDefault();
 //  if (!promptInstall) {
 //   return;
 //  }
 //  //@ts-ignore
 //  promptInstall.prompt();
 // };
 // if (!supportsPWA) {
 //  return null;
 // }
 return (
  <>
   {install && (
    <button className={s.pwa} onClick={install}>
     Установить как приложение
    </button>
   )}
  </>
  //<button
  // className={s.pwa}
  // id="setup_button"
  // aria-label="Install app"
  // title="Install app"
  // onClick={onClick}
  //>
  // Установить как приложение
  //</button>
 );
};
