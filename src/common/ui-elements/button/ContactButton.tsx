import addPlas from "../../../assets/icons/addPlas.webp";
import s from "./contactButton.module.scss";

interface ContactButtonType {
  textButton: string;
  isValid?: boolean;
  onClick?: () => void;
}

export const ContactButton = ({
  textButton,
  isValid,
  onClick,
}: ContactButtonType) => {
  return (
    <button
      className={s.contactButton}
      type="submit"
      disabled={isValid}
      onClick={onClick}
    >
      <div className={s.btnImgText}>
        <img src={addPlas} alt={addPlas} />
        <span>{textButton}</span>
      </div>
    </button>
  );
};
