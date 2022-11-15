import { ReactNode } from "react";
import s from "./input.module.scss";

interface InputType {
 inputLabel?: string;
 type?: string;
 errors?: any;
 errorBackgroundOrange?: any;
 inputValue?: string;
 children?: ReactNode;
 placeholder: string;
 onChange: any;
 ItemRef?: any;
 onClick?: any;
}
export const Input = ({
 children,
 inputLabel,
 type = "text",
 errors,
 errorBackgroundOrange,
 inputValue,
 placeholder,
 onChange,
 ItemRef,
 onClick,
 ...props
}: InputType) => {
 return (
  <div className={s.wrapperInput}>
   <label>{inputLabel}</label>

   <div className={s.inpFieldsRelative}>
    <input
     className={`${errors && s.error} ${
      errorBackgroundOrange && s.errorBackgroundOrange
     }`}
     type={type}
     value={inputValue}
     placeholder={placeholder}
     onChange={onChange}
     onClick={onClick}
     ref={ItemRef}
     {...props}
    />
    {children}
    {errors && (
     <span
      className={`${
       errorBackgroundOrange && s.errorBackgroundOrange
      }`}
     >
      {errors}
     </span>
    )}
   </div>
  </div>
 );
};
