import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType } from "./types/userSliceType";
import { getMyProfileApiThunk } from "./getMyProfileApiThunk";
import { MyTypeFormsAccountProfileType } from "./types/myTypeFormProfile";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import { actionGetDataThisActiveForms } from "./helpers/actionGetDataThisActiveForms";
import { updateDataMyFormTypeAccountThunk } from "./updateDataMyFormTypeAccountThunk";
import {
 getJsonParseLocalStorage,
 setJsonLocalStorage,
 setLocalStorageSwiperActiv,
} from "../../helpers/getJsonParseLocalStorage";
import { PortfolioType } from "../../types/PROFILE/accountMainGlobalType";
import { MusicianTypeResponse } from "./types/putReqestUpdateMyForm";
import { resetProfileData, resetProfileDataApiData } from "./service/resetProfileStore";

const TypeAccountType: { id: string; nameForms: string } = JSON.parse(getJsonParseLocalStorage());

interface PayloadReduser {
 tempData: MusicianTypeResponse | any;
 TypeAccountType: { id: string; nameForms: string };
}

const initialState: InitialStateType = {
 profileData: resetProfileData,
 profileDataApiData: resetProfileDataApiData,
 isActiveForms: getJsonParseLocalStorage() || "{}",
 allMyForms: [],
 error: false,
 isLoading: false,
 notHaveForms: false,
};

const userSlice = createSlice({
 name: "authSlice",
 initialState,
 reducers: {
  resetState(state: InitialStateType) {
   state.profileDataApiData = resetProfileDataApiData;
  },

  updateAvatar(state: InitialStateType, action: PayloadAction<PortfolioType>) {
   state.profileData.avatar = action.payload;
  },
  toggleForm(state: InitialStateType, action: PayloadAction<PayloadReduser>) {
   if (action.payload.tempData) {
    state.profileData = actionGetDataThisActiveForms(
     action.payload.tempData,
     action.payload.TypeAccountType
    );
   }
   state.isActiveForms = action.payload.TypeAccountType
    ? JSON.stringify(action.payload.TypeAccountType)
    : getJsonParseLocalStorage();
  },
 },

 extraReducers: (builder) => {
  builder
   .addCase(updateDataMyFormTypeAccountThunk.pending.type, (state: InitialStateType) => {
    state.isLoading = true;
   })
   .addCase(
    updateDataMyFormTypeAccountThunk.fulfilled.type,
    (state: InitialStateType, actions: PayloadAction<any>) => {
     state.isLoading = false;

     for (const key in actions.payload) {
      const element = actions.payload[key];
      if (element) {
       //@ts-ignore
       const m = state.profileDataApiData[key]?.map((x: any) => {
        if (x.id === element.id) {
         state.profileData = actionGetDataThisActiveForms(element, TypeAccountType);
         return element;
        } else return x;
       });
       //@ts-ignore
       state.profileDataApiData[key] = m;
      }
     }
    }
   )
   .addCase(
    updateDataMyFormTypeAccountThunk.rejected.type,
    (state: InitialStateType, actions: PayloadAction<string>) => {
     state.error = false;
     console.log("err register");
    }
   )

   .addCase(getMyProfileApiThunk.pending.type, (state: InitialStateType) => {
    state.isLoading = true;
    state.error = false;
   })
   .addCase(
    getMyProfileApiThunk.fulfilled.type,
    (state: InitialStateType, actions: PayloadAction<MyTypeFormsAccountProfileType[]>) => {
     if (!actions.payload.length) state.notHaveForms = true;
     else state.notHaveForms = false;

     state.isLoading = false;
     let checkData = true;

     const logicState = (itemObj: any, EnumTypeAccount: string) => {
      state.allMyForms.push(itemObj.id);

      if (checkData && !Object.keys(JSON.parse(getJsonParseLocalStorage())).length) {
       setLocalStorageSwiperActiv(0);
       setJsonLocalStorage(itemObj.id, EnumTypeAccount);
       state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
       checkData = false;
      }

      if (checkData && itemObj.id === JSON.parse(getJsonParseLocalStorage()).id) {
       state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
       checkData = false;
      }

      if (actions.payload.length < 2) {
       state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
      }
     };

     actions.payload.forEach((x) => {
      if (x.institutionForm) {
       state.profileDataApiData.institutionForm.push(x.institutionForm);
       logicState(x.institutionForm, EnumTypeAccount.INSTITUTION);
      } else if (x.musicalWorkshopForm) {
       state.profileDataApiData.musicalWorkshopForm.push(x.musicalWorkshopForm);
       logicState(x.musicalWorkshopForm, EnumTypeAccount.MUSICAL_WORKSHOP);
      } else if (x.musicianForm) {
       state.profileDataApiData.musicianForm.push(x.musicianForm);
       logicState(x.musicianForm, EnumTypeAccount.MUSICIAN);
      } else if (x.soundProducerForm) {
       state.profileDataApiData.soundProducerForm.push(x.soundProducerForm);
       logicState(x.soundProducerForm, EnumTypeAccount.SOUND_PRODUCER);
      } else if (x.musicianSchoolForm) {
       state.profileDataApiData.musicianSchoolForm.push(x.musicianSchoolForm);
       logicState(x.musicianSchoolForm, EnumTypeAccount.MUSICIAN_SCHOOL);
      } else if (x.musicShopForm) {
       state.profileDataApiData.musicShopForm.push(x.musicShopForm);
       logicState(x.musicShopForm, EnumTypeAccount.MUSIC_SHOP);
      } else if (x.rehearsalBaseForm) {
       state.profileDataApiData.rehearsalBaseForm.push(x.rehearsalBaseForm);
       logicState(x.rehearsalBaseForm, EnumTypeAccount.REHEARSAL_BASE);
      } else if (x.recordingStudioForm) {
       state.profileDataApiData.recordingStudioForm.push(x.recordingStudioForm);
       logicState(x.recordingStudioForm, EnumTypeAccount.RECORDING_STUDIO);
      } else if (x.teamForm) {
       state.profileDataApiData.teamForm.push(x.teamForm);
       logicState(x.teamForm, EnumTypeAccount.TEAM);
      } else if (x.musicLoverForm) {
       state.profileDataApiData.musicLoverForm.push(x.musicLoverForm);
       logicState(x.musicLoverForm, EnumTypeAccount.MUSIC_LOVER);
      }
     });
    }
   )
   .addCase(
    getMyProfileApiThunk.rejected.type,
    (state: InitialStateType, actions: PayloadAction<string>) => {
     state.error = true;
     state.isLoading = false;
    }
   );
 },
});

export const { updateAvatar, toggleForm, resetState } = userSlice.actions;
export default userSlice.reducer;
