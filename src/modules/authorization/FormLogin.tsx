import { useState } from "react";
import eye_open from "../../assets/icons/eye_open.webp";
import eye_close from "../../assets/icons/eye_close.webp";
import { Controller, useForm } from "react-hook-form";
import { InButton } from "../../common/ui-elements/button/InButton";
import { Input } from "../../common/ui-elements/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../core/redux/app/hooks";
import { authThunkLogin } from "./authThunkLogin";
import { ISignInFormValues } from "./types/type";
import { RouteNames } from "../../common/variables/RouteNames";
import s from "./style/formLogin.module.scss";

export const FormLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [eye, setEye] = useState(false);
  const toggleEye = () => setEye((prev) => !prev);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignInFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ISignInFormValues) => {
    dispatch(authThunkLogin(data));
    navigate(RouteNames.HOME, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.styleInput}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email обязателен",
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
      <div className={s.styleInput}>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field: { onChange } }) => (
            <Input
              type={eye ? "text" : "password"}
              inputLabel="Пароль"
              placeholder="Password"
              errors={errors.password && errors.password.message}
              errorBackgroundOrange={errors.password}
              onChange={onChange}
            >
              {watch("password").length > 0 &&
                (eye ? (
                  <img
                    onClick={toggleEye}
                    className={s.see}
                    src={eye_open}
                    alt={eye_open}
                  />
                ) : (
                  <img
                    onClick={toggleEye}
                    className={s.see}
                    src={eye_close}
                    alt={eye_close}
                  />
                ))}
            </Input>
          )}
        />
      </div>

      <Link to={RouteNames.RECOVERY_PASSWORD} className={s.forgetPassword}>
        Забыли пароль?
      </Link>

      <div className={s.styleBtn}>
        <InButton textButton="ВОЙТИ" />
      </div>
    </form>
  );
};
