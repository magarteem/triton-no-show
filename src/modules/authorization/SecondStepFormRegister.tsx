import {
 Controller,
 useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactSelect } from "../../common/components/signIn/reactSelect/ReactSelect";
import s from "./style/secondStepFormRegister.module.scss";
import { RouteNames } from "../../common/variables/RouteNames";
import { BtnInFormSaveCancel } from "../../common/components/navigateButton/BtnInFormSaveCancel";

export const SecondStepFormRegister = () => {
 const navigate = useNavigate();

 const {
  control,
  watch,
  formState: { errors },
 } = useFormContext();

 const nextStepRegister = () => {
  navigate(
   `${RouteNames.REGISTER}/${RouteNames.REG_CREATE_ACCOUNT}`
  );
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
     <ReactSelect
      itemRef={ref}
      errors={
       errors.typeAccount && errors.typeAccount.message
      }
      onChange={onChange}
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
