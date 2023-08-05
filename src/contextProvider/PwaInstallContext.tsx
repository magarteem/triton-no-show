import { createContext, ReactNode, useEffect, useState } from "react";
import { isThisDeviceRunningiOS } from "../modules/pwa/pwaInstall/pwaInstall";
import { IBeforeInstallPromptEvent } from "../modules/pwa/pwaInstall/type";

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
