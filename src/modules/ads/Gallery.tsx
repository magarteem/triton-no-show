import { memo, useState } from 'react';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRight.svg';
import s from './style/gallery.module.scss';

interface GalleryType {
  img: string[];
}

export const Gallery = memo(({ img }: GalleryType) => {
  const [sliderNumber, setSliderNumber] = useState(3);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index: number) => {
    setSliderNumber(index);
    setOpenModal(true);
  };
  const closed = () => {
    setOpenModal(false);
    setSliderNumber(3);
  };

  const handleArrowClick = () => {
    if (sliderNumber === img.length - 1) setSliderNumber(0);
    else setSliderNumber(sliderNumber + 1);
  };

  const handleArrowClickReturn = () => {
    if (sliderNumber === 0) setSliderNumber(img.length - 1);
    else setSliderNumber(sliderNumber - 1);
  };

  return (
    <div className={s.photo}>
      {openModal ? (
        <div className={s.modalOpen}>
          <ArrowLeft onClick={handleArrowClickReturn} className={s.arrowLeft} />
          <img
            className={s.imgSlide}
            src={img[sliderNumber]}
            alt={img[sliderNumber]}
          />
          <ArrowRight onClick={handleArrowClick} className={s.arrowRight} />
          <span onClick={closed} className={s.closed}>
            ✕
          </span>
        </div>
      ) : (
        <div className={s.gallery}>
          {img.slice(0, sliderNumber).map((x, index) => (
            <div
              onClick={() => handleOpenModal(index)}
              className={s.imgContainer}
              key={x}
            >
              <img src={x} alt={x} />
            </div>
          ))}
          {sliderNumber !== img.length && (
            <div
              onClick={() => setSliderNumber(img.length)}
              className={s.morePhoto}
            >
              {`+${img.length}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
