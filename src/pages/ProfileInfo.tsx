import { useContext } from "react";
import { AboutProfile } from "../common/components/profile/aboutProfile/AboutProfile";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { InitialStateUserType, ProfileDataApiDataType } from "../modules/user/types/userSliceType";
import { useOutletContext } from "react-router-dom";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { CheckMyHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";

interface ProfileInfoType {
 isLoading: boolean;
 profileData: InitialStateUserType;
 profileDataApiData: ProfileDataApiDataType;
}

export const ProfileInfo = () => {
 const { profileData, profileDataApiData, isLoading }: ProfileInfoType = useOutletContext();
 const { notHaveForms }: any = useContext(CheckMyHaveAccountContext);

 return (
  <>
   {!isLoading ? (
    <>
     <HeaderWrapper srcPhoto={profileData.avatar?.uri}>
      <HeaderProfile
       change={!notHaveForms}
       settings={true}
       avatar={profileData.avatar?.uri}
       profileDataApiData={profileDataApiData}
       textLabel={profileData.type_account.name}
      />
     </HeaderWrapper>

     <AboutProfile notHaveForms={notHaveForms} userDataProfile={profileData} />
    </>
   ) : (
    <PreLoader />
   )}
   <PopUpNavigateGradient />
  </>
 );
};
