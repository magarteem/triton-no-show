import s from "./button.module.scss";

interface PropsButton {
 textButton: string;
 isValidInButton?: boolean;
 onClick?: () => void;
}

export const InButton = ({
 textButton,
 isValidInButton,
 onClick,
}: PropsButton) => {
 return (
  <button
   className={s.buttonWrapper}
   type="submit"
   disabled={isValidInButton}
   onClick={onClick}
  >
   {textButton}
  </button>
 );
};
