import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../core/redux/app/hooks";
import { Link } from "react-router-dom";
import s from './style/swiper.module.scss';
import "swiper/css";

export const SwiperSlider = () => {
  const swiperData = useAppSelector((state) => state.adsSliceReducer.swiperData)

  return <div className={s.swiper}>
    <Swiper
      spaceBetween={6}
      speed={3500}
      autoplay
      modules={[Autoplay]}
      slidesPerView={"auto"}
    >
      {
        swiperData.map(x => (
          <SwiperSlide style={{ backgroundColor: `${x.backgroundColor}` }} key={x.text} className={s.swiperCard}>
            <Link to={x.link} className={s.link}>
              <h2>{x.text}</h2>
              <img src={x.urlImg} alt={x.urlImg} />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  </div >;
};
