import vk from "../../../assets/icons/vk.webp";
import yandex from "../../../assets/icons/yandex.webp";
import { Link } from "react-router-dom";
import s from "./styles/loginSocialNetwork.module.scss";

export const LoginSocialNetwork = () => {
  return (
    <div className={s.loginSocialNetwork}>
      <h2>ВОЙТИ ЧЕРЕЗ</h2>

      <div className={s.linkLogin}>
        <Link to={"vk"}>
          <img src={vk} alt="vk" />
        </Link>

        <Link to={"yandex"}>
          <img src={yandex} alt="yandex" />
        </Link>
      </div>
    </div>
  );
};
