import tritoneWelcome from "../assets/icons/tritoneWelcome.webp";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import s from "./styles/welcomeWindow.module.scss";

interface PreloadStartPagesType {
  setPreloaderPagesFu: () => void;
}

export const WelcomeWindow = ({
  setPreloaderPagesFu,
}: PreloadStartPagesType) => {
  return (
    <WrapperFullScreen>
      <div className={s.welcomeWindow}>
        <div className={s.logoAnimated}>
          <img src={tritoneWelcome} alt={tritoneWelcome} />
        </div>

        <div className={s.start}>
          <p>вступай – вдохновляйся - делись</p>
          <button onClick={setPreloaderPagesFu}>Начать</button>
        </div>
      </div>
    </WrapperFullScreen>
  );
};
