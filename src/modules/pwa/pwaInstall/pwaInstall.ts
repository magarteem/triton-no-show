// detect if the device is on iOS
const isIos = () => {
 const userAgent = window.navigator.userAgent.toLowerCase();
 return /iphone|ipad|ipod/.test(userAgent);
};

const userAgentCheckIos = navigator.userAgent.includes("Mac") && "ontouchend" in document; //iPad on iOS 13

// check if the device is in standalone mode
const isInStandaloneMode = () =>
 "standalone" in (window as any).navigator && (window as any).navigator.standalone;

export const isThisDeviceRunningiOS = (isIos() || userAgentCheckIos) && !isInStandaloneMode();

// pre test = dell code
//export const isThisDeviceRunningiOS = (): boolean => {
// // const checkShowIosInstallModal = localStorage.getItem("ios-install-modal");
// // detect if the device is on iOS
// const isIos = () => {
//  const userAgent = window.navigator.userAgent.toLowerCase();
//  return /iphone|ipad|ipod/.test(userAgent);
// };
// const userAgentCheckIos = navigator.userAgent.includes("Mac") && "ontouchend" in document; //iPad on iOS 13
// // check if the device is in standalone mode
// const isInStandaloneMode = () =>
//  "standalone" in (window as any).navigator && (window as any).navigator.standalone;
// // show the modal only once
// // const localStorageKeyValue = localStorage.getItem(checkShowIosInstallModal);
// // const iosInstallModalShown = localStorageKeyValue ? JSON.parse(localStorageKeyValue) : false;
// const shouldShowModalResponse = (isIos() || userAgentCheckIos) && !isInStandaloneMode(); //&& !iosInstallModalShown;
// // if (shouldShowModalResponse) localStorage.setItem(checkShowIosInstallModal, "true");
// return shouldShowModalResponse;
//};
