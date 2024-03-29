import { ButtonBack } from "../../ui-elements/button/ButtonBack";
import { InButton } from "../../ui-elements/button/InButton";
import s from "./btnInFormSaveCancel.module.scss";

interface BtnInFormSaveCancelType {
 textCancelButton: string;
 textButton: string;
 isValidButtonBack?: boolean;
 isValidInButton?: boolean;
 type?: "button" | "submit";
 onClick?: () => void;
}

export const BtnInFormSaveCancel = ({
 textCancelButton,
 textButton,
 isValidButtonBack,
 isValidInButton,
 type,
 onClick,
}: BtnInFormSaveCancelType) => {
 return (
  <div className={s.sendDataForm}>
   <div className={s.btnWrapper}>
    <ButtonBack textCancelButton={textCancelButton} isValidButtonBack={isValidButtonBack} />
   </div>
   <div className={s.btnWrapper}>
    <InButton
     textButton={textButton}
     isValidInButton={isValidInButton}
     onClick={onClick}
     type={type}
    />
   </div>
  </div>
 );
};
