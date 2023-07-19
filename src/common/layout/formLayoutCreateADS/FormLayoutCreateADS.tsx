import { useInView } from "react-intersection-observer";
import { NavigateHeader } from "../formLayout/NavigateHeader";
import { useEffect, useState } from "react";
import s from "./formLayoutCreateADS.module.scss";

interface FormLayoutCreateADSType {
  children: React.ReactNode;
  textLabel: string;
  arrowCanselImgIcon: string;
  closed?: boolean;
}

export const FormLayoutCreateADS = ({
  children,
  textLabel,
  arrowCanselImgIcon,
  closed = false,
}: FormLayoutCreateADSType) => {
  const [fixPozition, setFixPozition] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  useEffect(() => {
    setFixPozition(!inView);
  }, [inView]);

  return (
    <div className={s.formLayoutCreateADS}>
      <NavigateHeader
        fixPozition={fixPozition}
        textLabel={textLabel}
        closed={closed}
        arrowCanselImgIcon={arrowCanselImgIcon}
      />

      <div className={s.formFieldsWrapper}>
        <div className={s.fixPosition} ref={ref} />
        {children}
      </div>
    </div>
  );
};
