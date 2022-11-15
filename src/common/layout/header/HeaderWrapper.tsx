import { ReactNode } from "react";
import s from "./headerWrapper.module.scss";
import cn from "classnames";

interface HeaderWrapperType {
  children: ReactNode;
  srcPhoto?: string | undefined;
}

export const HeaderWrapper = ({ children, srcPhoto }: HeaderWrapperType) => {
  return (
    <section className={s.headerWrapper}>
      <div className={s.positionImg}>
        <div className={s.backgroundImg}>
          <div
            className={cn(s.reliativ130, { [s.backgroundActive]: srcPhoto })}
          ></div>
        </div>
        {children}
      </div>
    </section>
  );
};
