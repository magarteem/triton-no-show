import eye_open from "../../assets/icons/eye_open.webp";
import eye_close from "../../assets/icons/eye_close.webp";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../common/ui-elements/Input/Input";
import { RecoveryCreateNewPassFormType } from "./types/type";
import { useState } from "react";
import s from "./style/recoveryPassGetInstructionsForm.module.scss";
import { InButton } from "../../common/ui-elements/button/InButton";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../common/variables/RouteNames";

export const RecoveryCreateNewPassForm = () => {
  const navigate = useNavigate();
  const goLogin = () => navigate(`${RouteNames.LOGIN}`, { replace: true });

  const [eye, setEye] = useState(false);
  const [eyeRepeat, seteyeRepeat] = useState(false);
  const toggleEye = () => setEye((prev) => !prev);
  const toggleEyeRepeat = () => seteyeRepeat((prev) => !prev);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RecoveryCreateNewPassFormType>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      repeat_password: "",
    },
  });

  const watchHandler = (watches: string, eye: boolean, toggle: () => void) => {
    return (
      watches.length > 0 &&
      (eye ? (
        <img onClick={toggle} className={s.see} src={eye_open} alt={eye_open} />
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

  const onSubmit = (data: RecoveryCreateNewPassFormType) => {
    // dispatch();
    console.log(data);
    goLogin();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.styleInput}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Обязательное поле",
            minLength: { value: 3, message: "Не менее 3х символов" },
          }}
          render={({ field: { onChange } }) => (
            <>
              <Input
                inputValue={watch("password", "")}
                type={eye ? "text" : "password"}
                inputLabel="Пароль"
                placeholder="Пароль"
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

      <div className={s.styleInput}>
        <Controller
          name="repeat_password"
          control={control}
          rules={{
            required: "Обязательное поле",
            minLength: { value: 3, message: "Не менее 3х символов" },
            validate: (value) =>
              value === watch("password", "") || "Пароли не совпадают",
          }}
          render={({ field: { onChange } }) => (
            <>
              <Input
                inputValue={watch("repeat_password", "")}
                type={eyeRepeat ? "text" : "password"}
                placeholder="Подтверждение пароля"
                errors={
                  errors.repeat_password && errors.repeat_password.message
                }
                errorBackgroundOrange={errors.repeat_password}
                onChange={onChange}
              >
                {watchHandler(
                  watch("repeat_password"),
                  eyeRepeat,
                  toggleEyeRepeat
                )}
              </Input>
            </>
          )}
        />
      </div>

      <div className={s.styleBtn}>
        <InButton textButton="Отправить" />
      </div>
    </form>
  );
};
