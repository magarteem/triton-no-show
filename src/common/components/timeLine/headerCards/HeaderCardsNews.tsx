import { Avatar } from "@mui/material";
import { LongMenu, OptionLongMenuType } from "../../../mui-element/LongMenu";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../core/router/RouteNames";
import noAvatar from "../../../../assets/icons/noAvatar.svg";
import { NewsResultType } from "../../../../modules/timeLine/types/responseNewsType";
import { selectTypeNews } from "../../../../modules/timeLine/service/optionСategoryBD";
import s from "./headerCardsNews.module.scss";

interface HeaderCardsType {
  timeLinePost: NewsResultType;
  menu?: boolean;
  options?: OptionLongMenuType[];
}

export const HeaderCardsNews = ({ menu = true, timeLinePost, options }: HeaderCardsType) => {
  return (
    <div className={s.headerCardsNews}>
      <Link
        to={`${RouteNames.OTHER_PROFILE_USER}/${timeLinePost.form.formId}`}
        className={s.author}
      >
        <div className={s.avatar}>
          <Avatar
            alt="Remy Sharp"
            src={timeLinePost.form?.avatar ? timeLinePost.form.avatar.uri : noAvatar}
          />
        </div>
        <div className={s.infoAuthor}>
          <h2 className={s.name}>{timeLinePost.form?.name}</h2>
          <span className={s.visit}>{selectTypeNews[timeLinePost.type]}</span>
        </div>
      </Link>

      {menu && (
        <div className={s.buttonAction}>
          <LongMenu options={options} />
        </div>
      )}
    </div>
  );
};
