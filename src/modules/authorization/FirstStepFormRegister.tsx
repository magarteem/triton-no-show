import { useState } from "react";
import eye_open from "../../assets/icons/eye_open.webp";
import eye_close from "../../assets/icons/eye_close.webp";
import {
 Controller,
 useFormContext,
} from "react-hook-form";
import { InButton } from "../../common/ui-elements/button/InButton";
import { Input } from "../../common/ui-elements/Input/Input";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../common/variables/RouteNames";
import { RegistrationQuestionLink } from "../../common/components/signIn/registrationQuestion/RegistrationQuestionLink";
import s from "./style/firstFormRegister.module.scss";

export const FirstStepFormRegister = () => {
 const navigate = useNavigate();

 const {
  trigger,
  control,
  watch,
  formState: { errors },
 } = useFormContext();

 const nextStepRegister = async (dataField: string[]) => {
  const result = await trigger(dataField);
  if (!result) return;
  navigate("/register/reg-type-account");
 };

 const [eye, setEye] = useState(false);
 const toggleEye = () => setEye((prev) => !prev);

 const watchHandler = (
  watches: string,
  eye: boolean,
  toggle: () => void
 ) => {
  return (
   watches.length > 0 &&
   (eye ? (
    <img
     onClick={toggle}
     className={s.see}
     src={eye_open}
     alt={eye_open}
    />
   ) : (
    <img
     onClick={toggle}
     className={s.see}
     src={eye_close}
     alt={eye_close}
    />
   ))
  );
 };

 return (
  //<CommonLoginLayout>

  <div className={s.wrapperFirstFormRegister}>
   <div>
    <div className={s.styleInput}>
     <Controller
      name="email"
      control={control}
      rules={{
       required: "Email обязателен",
       pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Это не Email",
       },
      }}
      render={({ field: { onChange, value } }) => (
       <Input
        inputValue={value}
        type="text"
        inputLabel="Email"
        placeholder="Выберите Email"
        errors={errors.email && errors.email.message}
        errorBackgroundOrange={errors.email}
        onChange={onChange}
       />
      )}
     />
    </div>

    <div className={s.styleInput}>
     <Controller
      name="password"
      control={control}
      rules={{
       required: "Обязательное поле",
       minLength: {
        value: 3,
        message: "Не менее 3х символов",
       },
      }}
      render={({ field: { onChange, value } }) => (
       <>
        <Input
         inputValue={value}
         type={eye ? "text" : "password"}
         inputLabel="Пароль"
         placeholder="Выберите пароль"
         errors={errors.password && errors.password.message}
         errorBackgroundOrange={errors.password}
         onChange={onChange}
        >
         {watchHandler(watch("password"), eye, toggleEye)}
        </Input>
       </>
      )}
     />
    </div>

    <div className={s.styleBtn}>
     <InButton
      textButton="Продолжить"
      onClick={() =>
       nextStepRegister(["email", "password"])
      }
     />
    </div>
   </div>

   <RegistrationQuestionLink
    linkTo={RouteNames.LOGIN}
    lintText="ВОЙТИ"
    questionText="Уже есть аккаунт?"
   />
  </div>
  //</CommonLoginLayout>
 );
};
