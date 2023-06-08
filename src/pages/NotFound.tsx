import { EmptyFullScreenOrange } from "../common/layout/emptyFullScreenOrange/EmptyFullScreenOrange";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import s from "./styles/notFound_404.module.scss";

export const NotFound = () => {
  return (
    <WrapperFullScreen>
      <EmptyFullScreenOrange textLabel="Назад">
        <div className={s.notFound_404}>
          <p>Страница не найдена</p> <p>Ошибка 404</p>
        </div>
      </EmptyFullScreenOrange>
    </WrapperFullScreen>
  );
};
