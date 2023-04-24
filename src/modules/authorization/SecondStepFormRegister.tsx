import { Controller, useFormContext } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RouteNames } from "../../core/router/RouteNames";
import { BtnInFormSaveCancel } from "../../common/components/navigateButton/BtnInFormSaveCancel";
import { ReactSelectElement } from "../../common/ui-elements/react-select/ReactSelectElement";
import { optionsTypeAccount } from "./service/BD";
import { convertOptions } from "./helpers/convertOptions";
import { LoginResponseType } from "../../types/SSO/loginResponseType";
import { useEffect } from "react";
import s from "./style/secondStepFormRegister.module.scss";

export const SecondStepFormRegister = () => {
 const [responseLogin]: [LoginResponseType] = useOutletContext();
 const navigate = useNavigate();

 useEffect(() => {
  !responseLogin && navigate(`${RouteNames.REGISTER}`);
 }, [responseLogin]);

 const {
  control,
  watch,
  formState: { errors },
 } = useFormContext();

 const nextStepRegister = () => {
  navigate(`${RouteNames.REGISTER}/${RouteNames.REG_CREATE_ACCOUNT}`);
 };

 const customStyles = {
  singleValue: (provided: any) => ({
   ...provided,
   fontSize: `14px !important`,
  }),
 };

 return (
  <div className={s.secondStepFormRegister}>
   <h2>Тип аккаунта</h2>
   <Controller
    name="type_account"
    control={control}
    rules={{
     required: "тип обязателен",
    }}
    render={({ field: { onChange, ref, ...field } }) => (
     <ReactSelectElement
      ItemRef={ref}
      placeholder="Выбрать"
      options={convertOptions(optionsTypeAccount)}
      //options={optionsTypeAccount}
      onChange={onChange}
      errors={errors.type_account}
      customStyles={customStyles}
      {...field}
     />
    )}
   />

   <div className={s.btnFormWrapper}>
    <BtnInFormSaveCancel
     textCancelButton="Назад"
     textButton="Далее"
     isValidInButton={!!!watch("type_account")}
     onClick={nextStepRegister}
    />
   </div>
  </div>
 );
};
//import { Controller, useFormContext } from "react-hook-form";
//import { useNavigate, useOutletContext } from "react-router-dom";
//import { RouteNames } from "../../core/router/RouteNames";
//import { BtnInFormSaveCancel } from "../../common/components/navigateButton/BtnInFormSaveCancel";
//import { ReactSelectElement } from "../../common/ui-elements/react-select/ReactSelectElement";
//import { optionsTypeAccount } from "./service/BD";
//import { convertOptions } from "./helpers/convertOptions";
//import s from "./style/secondStepFormRegister.module.scss";
//import { LoginResponseType } from "../../types/SSO/loginResponseType";
//import { useEffect } from "react";
//import { useAppDispatch } from "../../core/redux/app/hooks";
//import { authThunkCreateMyTypeForms } from "./authThunkCreateMyTypeForms";

//export const SecondStepFormRegister = () => {
// const [responseLogin]: [LoginResponseType] = useOutletContext();

// const dispatch = useAppDispatch();
// const navigate = useNavigate();

// useEffect(() => {
//  !responseLogin && navigate(`${RouteNames.REGISTER}`);
// }, [responseLogin]);

// const {
//  control,
//  watch,
//  formState: { errors },
// } = useFormContext();

// const nextStepRegister = () => {
//  dispatch(authThunkCreateMyTypeForms(watch("type_account").value));

//  navigate(`${RouteNames.REGISTER}/${RouteNames.REG_CREATE_ACCOUNT}`);
// };

// const customStyles = {
//  singleValue: (provided: any) => ({
//   ...provided,
//   fontSize: `14px !important`,
//  }),
// };

// return (
//  <div className={s.secondStepFormRegister}>
//   <h2>Тип аккаунта</h2>
//   <Controller
//    name="type_account"
//    control={control}
//    rules={{
//     required: "тип обязателен",
//    }}
//    render={({ field: { onChange, ref, ...field } }) => (
//     <ReactSelectElement
//      ItemRef={ref}
//      placeholder="Выбрать"
//      options={convertOptions(optionsTypeAccount)}
//      //options={optionsTypeAccount}
//      onChange={onChange}
//      errors={errors.type_account}
//      customStyles={customStyles}
//      {...field}
//     />
//    )}
//   />

//   <div className={s.btnFormWrapper}>
//    <BtnInFormSaveCancel
//     textCancelButton="Назад"
//     textButton="Далее"
//     isValidInButton={!!!watch("type_account")}
//     onClick={nextStepRegister}
//    />
//   </div>
//  </div>
// );
//};
