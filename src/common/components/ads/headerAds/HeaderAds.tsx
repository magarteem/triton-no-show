import { Link } from "react-router-dom";
import { ResultAdsTypeResponse } from "../../../../modules/ads/types/responseAdsType";
import { LongMenu, OptionLongMenuType } from "../../../mui-element/LongMenu";
import { useAdsOptionsLongMenu } from "../../../../modules/ads/hooks/useAdsOptionsLongMenu";
import cn from "classnames";
import s from "./headerAds.module.scss";

interface HeaderAdsType {
  x: ResultAdsTypeResponse;
  link: string;
  notifikationOPtionsLongMenu?: OptionLongMenuType[];
}

export const HeaderAds = ({ x, link, notifikationOPtionsLongMenu }: HeaderAdsType) => {
  const optionLongMenu = useAdsOptionsLongMenu(x);
  const salary = () => {
    if (!x.jobDocument) return x.conditions;
    else return x.jobDocument.conditions;
  };

  return (
    <div className={cn(s.headerAds, { [s.noPayForHeader]: !x.title })}>
      <Link to={link}>
        <div className={cn(s.title, { [s.noPay]: !x.title })}>
          <h2>{x.title ?? "Запрос контактов"}</h2>

          {x.title && (!!salary()?.salary ? <p>{salary()?.salary}</p> : <p>Не коммерческое</p>)}
          <p>{x.city?.title}</p>
        </div>
      </Link>

      <div className={s.buttonAction}>
        <LongMenu
          options={notifikationOPtionsLongMenu ? notifikationOPtionsLongMenu : optionLongMenu}
        />
      </div>
    </div>
  );
};
