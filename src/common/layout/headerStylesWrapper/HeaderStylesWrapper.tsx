import { IconButton } from "@mui/material";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { onShare } from "../../../modules/pwa/onShare";
import { ArrowBtnStepsBack } from "../../components/navigateButton/ArrowBtnStepsBack";
import { ColorModeContext } from "../../../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "./headerStylesWrapper.module.scss";

interface HeaderStylesWrapperType {
  textLabel?: string;
  cancelImgIcon?: string | ReactNode;
  anyIconsFirst?: { img: string | ReactNode; action: string };
  anyIconActivSpecified?: boolean;
  anyIconsSecond?: { img: string | ReactNode; action: string };
  anyIconsSecondActivSpecified?: boolean;
  tsxElement?: any;
  children?: ReactNode;
  share?: string | ReactNode;
  onClickAnyIconsFirst?: () => void;
  onClickAnyIconsSecond?: () => void;
}

export const HeaderStylesWrapper = ({
  textLabel,
  cancelImgIcon,
  anyIconsFirst,
  anyIconActivSpecified = false,
  anyIconsSecond,
  anyIconsSecondActivSpecified = false,
  tsxElement,
  children,
  share,
  onClickAnyIconsFirst,
  onClickAnyIconsSecond,
}: HeaderStylesWrapperType) => {
  const { mode } = useContext(ColorModeContext);

  return (
    <section className={s.headerStylesWrapper}>
      <div className={s.titleNavigation}>
        {children}
        {cancelImgIcon && <ArrowBtnStepsBack mode={mode} cancelImgIcon={cancelImgIcon} />}
        <p>{textLabel}</p>
      </div>

      <div className={s.titleSettings}>
        {!!share && typeof share === "string" ? (
          <IconButton onClick={onShare}>
            <img src={share} alt={share} />
          </IconButton>
        ) : (
          share && (
            <div>
              <IconButton onClick={onShare} className={cn({ [s.imgIconFill]: mode === "dark" })}>
                {share}
              </IconButton>
            </div>
          )
        )}

        {anyIconsFirst && typeof anyIconsFirst.img === "string" ? (
          <Link to={anyIconsFirst.action}>
            <IconButton onClick={onClickAnyIconsFirst}>
              <img src={anyIconsFirst.img} alt={anyIconsFirst.img} />
            </IconButton>
          </Link>
        ) : (
          <div>
            <Link to={anyIconsFirst ? anyIconsFirst.action : ""}>
              {/*<IconButton onClick={onClickAnyIconsFirst} className={cn({ [s.imgIcon]: mode === "dark" })}>*/}
              <IconButton
                onClick={onClickAnyIconsFirst}
                className={cn(
                  mode === "dark" && (anyIconActivSpecified ? s.imgIconActiveFiler : s.imgIcon)
                )}
              >
                {anyIconsFirst?.img}
              </IconButton>
            </Link>
          </div>
        )}

        {/*{anyIconsSecond && (
     <IconButton onClick={onClickAnyIconsSecond}>
      <img src={anyIconsSecond.img} alt={anyIconsSecond.img} />
     </IconButton>
    )}*/}

        {anyIconsSecond && typeof anyIconsSecond.img === "string" ? (
          <Link to={anyIconsSecond.action}>
            <IconButton onClick={onClickAnyIconsSecond}>
              <img src={anyIconsSecond.img} alt={anyIconsSecond.img} />
            </IconButton>
          </Link>
        ) : (
          anyIconsSecond && (
            <div>
              <IconButton
                onClick={onClickAnyIconsSecond}
                className={cn(
                  mode === "dark" &&
                    (anyIconsSecondActivSpecified ? s.imgIconActiveFiler : s.imgIcon)
                )}
                //className={cn({ [s.imgIcon]: mode === "dark" })}
              >
                {anyIconsSecond?.img}
              </IconButton>
            </div>
          )
        )}

        {tsxElement && tsxElement}
      </div>
    </section>
  );
};
