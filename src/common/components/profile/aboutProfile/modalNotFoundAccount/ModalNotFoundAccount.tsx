import { Link } from "react-router-dom";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { ButtonBackMui } from "../../../../mui-element/ButtonBackMui";
import { ButtonSubmitMui } from "../../../../mui-element/ButtonSubmitMui";
import s from "./modalNotFoundAccount.module.scss";

interface ModalNotFoundAccountType {
 handleClose: () => void;
}

export const ModalNotFoundAccount = ({ handleClose }: ModalNotFoundAccountType) => {
 return (
  <div className={s.modalNotFoundAccount}>
   <div className={s.modalTitle}>
    <h2>Создайте анкету</h2>
    <p>чтобы использовать все возможности нашего сервиса.</p>
   </div>

   <div className={s.navigateModal}>
    <div className={s.btnWrapper}>
     <ButtonBackMui textCancelButton="Позже" cancelClick={handleClose} />
    </div>

    <div className={s.btnWrapper}>
     <Link to={RouteNames.ADD_NEW_ACCOUNT} onClick={handleClose}>
      <ButtonSubmitMui textButton="Создать" isValidInButton={false} />
     </Link>
    </div>
   </div>
  </div>
 );
};
