import { createContext, ReactNode, useEffect, useState } from "react";

interface Props {
 children: ReactNode;
}

export const PwaInstall = createContext({});

export const PwaInstallContext = ({ children, ...props }: Props) => {
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

 const isThisDeviceRunningiOS = () => {
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
 };

 return (
  <PwaInstall.Provider
   value={{
    supportsPWA,
    promptInstall,
    isThisDeviceRunningiOS,
   }}
   {...props}
  >
   {children}
  </PwaInstall.Provider>
 );
};
