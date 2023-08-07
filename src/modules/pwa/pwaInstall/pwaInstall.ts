// detect if the device is on iOS
export const isIos = () => {
 const userAgent = window.navigator.userAgent.toLowerCase();
 return /iphone|ipad|ipod/.test(userAgent);
};

const userAgentCheckIos = navigator.userAgent.includes("Mac") && "ontouchend" in document; //iPad on iOS 13

// check if the device is in standalone mode
const isInStandaloneMode = () =>
 "standalone" in (window as any).navigator && (window as any).navigator.standalone;

export const isThisDeviceRunningiOS = (isIos() || userAgentCheckIos) && !isInStandaloneMode();
