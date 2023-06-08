import cancelImgIcon from "../../../assets/icons/arrowBack.svg";
import { NavigateHeader } from "../formLayout/NavigateHeader";
import s from "./emptyFullScreenOrange.module.scss";

interface EmptyFullScreenOrangeType {
  children: React.ReactNode;
  textLabel: string;
}

export const EmptyFullScreenOrange = ({ children, textLabel }: EmptyFullScreenOrangeType) => {
  return (
    <div className={s.emptyFullScreenOrange}>
      {textLabel && <NavigateHeader textLabel={textLabel} arrowCanselImgIcon={cancelImgIcon} />}

      <div className={s.formFieldsWrapper}>{children}</div>
    </div>
  );
};
