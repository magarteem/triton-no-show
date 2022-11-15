import req from "../../../assets/icons/required.webp";
import s from "./inputLabel.module.scss";

interface InputLabelType {
  titleSelect: string;
  required?: boolean;
}

export const InputLabel = ({
  titleSelect,
  required = false,
}: InputLabelType) => {
  return (
    <div className={s.inputLabel}>
      <span>
        {titleSelect}
        {required && <img src={req} alt={req} />}
      </span>
    </div>
  );
};
