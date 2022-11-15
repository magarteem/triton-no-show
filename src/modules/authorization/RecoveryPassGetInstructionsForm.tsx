import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InButton } from "../../common/ui-elements/button/InButton";
import { Input } from "../../common/ui-elements/Input/Input";
import { RecoveryPassGetInstructionsFormType } from "./types/type";
import s from "./style/recoveryPassGetInstructionsForm.module.scss";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../common/variables/RouteNames";

export const RecoveryPassGetInstructionsForm = () => {
  const navigate = useNavigate();
  const goCreateNewPassword = () =>
    navigate(`${RouteNames.RECOVERY_CREATE_PASSWORD}`, { replace: true });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RecoveryPassGetInstructionsFormType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: RecoveryPassGetInstructionsFormType) => {
    // dispatch(authThunkLogin(data));
    console.log(data);
    goCreateNewPassword();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.styleInput}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Введите Email",
            pattern: { value: /\S+@\S+\.\S+/, message: "Это не Email" },
          }}
          render={({ field: { onChange } }) => (
            <Input
              type="text"
              inputLabel="Email"
              placeholder="Email"
              errors={errors.email && errors.email.message}
              errorBackgroundOrange={errors.email}
              onChange={onChange}
            />
          )}
        />
      </div>

      <div className={s.styleBtn}>
        <InButton textButton="Отправить" />
      </div>
    </form>
  );
};
