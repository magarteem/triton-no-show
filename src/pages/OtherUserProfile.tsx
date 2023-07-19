import arrowReturnWhite from "../assets/icons/arrowBackWidthStroke.svg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AboutProfile } from "../common/components/profile/aboutProfile/AboutProfile";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { InitialStateUserType } from "../modules/user/types/userSliceType";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { ReactComponent as ShareIcons } from "../assets/icons/shareIcons.svg";
import { onShare } from "../modules/pwa/onShare";
import { actionGetDataThisActiveForms } from "../modules/user/helpers/actionGetDataThisActiveForms";
import { useGetOtherUserProfileForIDQuery } from "../modules/user/getGetMyProfileQuery";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { restructureDateApiForStore } from "../modules/user/helpers/restructypeDateApiForStore";
import { InButton } from "../common/ui-elements/button/InButton";
import { EnumContactRequestStatusResponse } from "../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { EnumPrivateType } from "../types/PROFILE/enum/EnumPrivateType";
import { ClosedAboutProfile } from "../common/components/profile/aboutProfile/ClosedAboutProfile";
import { MusicianTypeResponse } from "../modules/user/types/putReqestUpdateMyForm";
import { CheckMyHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";
import s from "./styles/otherUserProfile.module.scss";

export const OtherUserProfile = () => {
  const { id_user } = useParams();
  const { notHaveForms }: any = useContext(CheckMyHaveAccountContext);
  const [user, setUser] = useState<InitialStateUserType>();
  const { data, isLoading, isError } = useGetOtherUserProfileForIDQuery(id_user || "");

  useEffect(() => {
    for (const key in data) {
      //@ts-ignore
      if (data[key]) {
        const reselectData = actionGetDataThisActiveForms(
          //@ts-ignore
          data[key],
          {
            //@ts-ignore
            id: data[Object.keys(data)].id,
            //@ts-ignore
            nameForms: Object.keys(data)[0].replace("Form", "").toLowerCase(),
          }
        );
        setUser(reselectData);
      }
    }
  }, [data]);

  if (isLoading) return <PreLoader />;
  const dataParse = data && (Object.values(data)[0] as MusicianTypeResponse);

  return (
    <>
      <HeaderWrapper srcPhoto={user?.avatar?.uri}>
        <HeaderProfile
          textLabel={data && Object.keys(data)[0].replace("Form", "")}
          profileDataApiData={restructureDateApiForStore(actions_payload)}
          avatar={user?.avatar?.uri}
          share={<ShareIcons onClick={onShare} className={s.shareIcon} />}
          cancelImgIcon={arrowReturnWhite}
        />
      </HeaderWrapper>

      {/*{user && <AboutProfile userDataProfile={user} />}*/}
      {dataParse?.privateType !== EnumPrivateType.HIDE_ALL ||
      dataParse?.contactRequestStatus === EnumContactRequestStatusResponse.MY_FORM
        ? user && <AboutProfile notHaveForms={notHaveForms} userDataProfile={user} />
        : user && data && <ClosedAboutProfile userDataProfile={Object.values(data)[0]} />}

      {isError && (
        <p className={s.closedProfileInfo}>
          <InButton textButton="Профиль закрыт" isValidInButton={false} />
        </p>
      )}
      {/*<PopUpNavigateGradient />*/}
    </>
  );
};

const actions_payload: any = {
  institutionForm: null,
  musicalWorkshopForm: null,
  musicianForm: {
    instruments: [
      {
        id: "23827237-926e-49ee-9c63-dba9a37360e8",
        name: "Губная гармоника",
        icon: "harmonica",
      },
      {
        id: "69ca6c3f-aa4b-4163-95f6-3d54988977df",
        name: "Волынка",
        icon: "bagpipes",
      },
      {
        id: "843cf38f-70e7-4980-a8ae-c2e4f2b32fdd",
        name: "Кларнет",
        icon: "clarinet",
      },
    ],
    genres: [
      {
        id: "26a74546-52f4-452c-ac32-b973d4a100d6",
        name: "Альтернатива",
        color: "#E7685F",
      },
      {
        id: "4c3d0fde-3a18-4ee4-b596-12d625a673fa",
        name: "Гранж",
        color: "#FF6A6A",
      },
      {
        id: "545a4c3c-e0b7-46bd-9398-c0a0cbe1fe33",
        name: "Прогрессив",
        color: "#FF6A6A",
      },
    ],
    id: "43e6d5e8-23ff-4014-a341-09ff8aa287fb",
    isVerified: false,
    isActive: false,
    privateType: "HideAll",
    avatar: {
      name: "16160153541.png",
      uri: "https://3tone-test.storage.yandexcloud.net/16160153541_43bfc109-6c37-4e09-8257-20f86486d9b5.png",
    },
    portfolios: [
      {
        name: "16160154274.jpg",
        uri: "https://3tone-test.storage.yandexcloud.net/16160154274_6d1b0fc5-3141-42b9-999c-083023c09a49.jpg",
      },
    ],
    document: {
      gender: "Male",
      birthday: "2008-02-05",
      experience: "string",
      skill: "Confident",
      education: "snhhhhhhhhhh",
      name: "string1eew 13q",
      city: {
        id: 10,
        title: "Волгоград",
        countryTitle: null,
        important: true,
      },
      description: "string 122222222222a",
      contacts: [
        {
          contactType: "phone",
          value: "string",
        },
      ],
    },
  },
  soundProducerForm: null,
  musicianSchoolForm: null,
  musicShopForm: null,
  rehearsalBaseForm: null,
  recordingStudioForm: null,
  teamForm: null,
  // musiclover: null,
};
