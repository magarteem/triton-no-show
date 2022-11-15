import React, { ReactNode } from "react";
import s from "./fieldItemCreateAccount.module.scss";

interface FieldItemCreateAccountType {
  children: ReactNode;
}

export const FieldItemCreateAccount = ({
  children,
}: FieldItemCreateAccountType) => {
  return (
    <div className={s.fieldItemCreateAccount}>
      {/* <div className={s.titleSelect}>
        <span>
          {titleSelect}
          {required && <img src={req} alt={req} />}
        </span>
      </div> */}

      {/* <Select
        className="custom_style_container_typeAccount_reg"
        placeholder={placeholder}
        isSearchable={false}
        onChange={(e: any) => onChange(e.value)}
        options={options}
        classNamePrefix="custom_style_list_typeAccount_reg"
        menuIsOpen
      /> */}
    </div>
  );
};
