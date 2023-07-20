import { useContext, useState } from "react";
import { AboutProfile } from "../common/components/profile/aboutProfile/AboutProfile";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { InitialStateUserType, ProfileDataApiDataType } from "../modules/user/types/userSliceType";
import { useOutletContext } from "react-router-dom";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { CheckMyHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";
import { SnackbarWarning } from "../common/mui-element/snackbar/SnackbarWarning";
import ReactPWAInstallProvider from "react-pwa-install";

interface ProfileInfoType {
 isLoading: boolean;
 profileData: InitialStateUserType;
 profileDataApiData: ProfileDataApiDataType;
 error: boolean;
}

export const ProfileInfo = () => {
 const { profileData, profileDataApiData, isLoading, error }: ProfileInfoType = useOutletContext();
 const [open, setOpen] = useState(error);
 const { notHaveForms }: any = useContext(CheckMyHaveAccountContext);

 return (
  <>
   {!isLoading ? (
    <>
     <HeaderWrapper srcPhoto={profileData.avatar?.uri}>
      <HeaderProfile
       change={!notHaveForms && !error}
       settings={true}
       avatar={profileData.avatar?.uri}
       profileDataApiData={profileDataApiData}
       textLabel={profileData.type_account.name}
      />
     </HeaderWrapper>

     {!error && (
      //@ts-ignore
      <ReactPWAInstallProvider enableLogging>
       <AboutProfile notHaveForms={notHaveForms} userDataProfile={profileData} />
      </ReactPWAInstallProvider>
     )}
    </>
   ) : (
    <PreLoader />
   )}
   {/*<PopUpNavigateGradient />*/}

   {error && (
    <SnackbarWarning text="Ошибка запроса" open={open} setOpen={setOpen} severity={"error"} />
   )}
  </>
 );
};
