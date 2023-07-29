import { createContext, ReactNode, useEffect, useState } from "react";
import { IBeforeInstallPromptEvent } from "../modules/pwa/type";
import { isThisDeviceRunningiOS } from "../modules/pwa/pwaInstall/pwaInstall";

export interface PWAinstallContextType {
 supportsPWA: boolean;
 promptInstall: IBeforeInstallPromptEvent | null;
 isThisDeviceRunningiOS: boolean;
 setSupportsPWA: (supp: boolean) => void;
}

interface Props {
 children: ReactNode;
}

export const PwaInstall = createContext<PWAinstallContextType>({
 supportsPWA: false,
 promptInstall: null,
 isThisDeviceRunningiOS: false,
 setSupportsPWA: () => false,
});

export const PwaInstallContext = ({ children, ...props }: Props) => {
 const [supportsPWA, setSupportsPWA] = useState(false);
 const [promptInstall, setPromptInstall] = useState<IBeforeInstallPromptEvent | null>(null);

 useEffect(() => {
  const handler = (e: any) => {
   e.preventDefault();
   setSupportsPWA(true);
   setPromptInstall(e);
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => {
   window.removeEventListener("beforeinstallprompt", handler);
  };
 }, []);

 // const isThisDeviceRunningiOS = () => {
 //  if (
 //   ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
 //    navigator.platform
 //   )
 //  )
 //   return true;
 //  // iPad on iOS 13
 //  else if (navigator.userAgent.includes("Mac") && "ontouchend" in document) {
 //   return true;
 //  } else {
 //   return false;
 //  }
 // };

 return (
  <PwaInstall.Provider
   value={{
    supportsPWA,
    promptInstall,
    isThisDeviceRunningiOS,
    setSupportsPWA,
   }}
   {...props}
  >
   {children}
  </PwaInstall.Provider>
 );
};
