import { ChangeEvent, useState } from "react";
import { Input } from "../common/ui-elements/Input/Input";
import filter from "../assets/icons/filter.webp";
import search from "../assets/icons/search.webp";
import { SwiperSlider } from "../modules/ads/SwiperSlider";
import { Timeline } from "../common/layout/timeline/Timeline";
import { useAppSelector } from "../core/redux/app/hooks";
import s from "./styles/ads.module.scss";
import { NavigateButtonWidthAddBtn } from "../common/components/navigateButton/NavigateButtonWidthAddBtn";

export const Ads = () => {
  const [impValue, setImpValue] = useState("");
  const adsCardsData = useAppSelector(
    (state) => state.adsSliceReducer.adsCards
  );

  const changeImpValue = (e: ChangeEvent<HTMLInputElement>) =>
    setImpValue(e.target.value);

  return (
    <>
      <section className={s.header}>
        <div className={s.ads}>
          <h1>Объявления</h1>
          <div className={s.imgFilter}>
            <img src={filter} alt={filter} />
            <span>2</span>
          </div>
        </div>

        <div className={s.search}>
          <Input
            type="text"
            inputLabel=""
            inputValue={impValue}
            placeholder="Поиск"
            onChange={changeImpValue}
          >
            <img className={s.searchIcon} src={search} alt={search} />
          </Input>
        </div>
      </section>

      <section className={s.main}>
        <SwiperSlider />

        <div className={s.participant}>
          {adsCardsData.map((x) => (
            <Timeline key={x.name} elem={x} />
          ))}
        </div>
      </section>

      <NavigateButtonWidthAddBtn />
    </>
  );
};
