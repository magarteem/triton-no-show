import { TimelineCards } from '../../../core/redux/types/adsSliceType';
import { Gallery } from '../../../modules/ads/Gallery';
import s from './timeline.module.scss';

interface TimelineType {
  elem: TimelineCards;
}

export const Timeline: React.FC<TimelineType> = ({ elem }) => {
  return (
    <div className={s.timelineCards}>
      <div className={s.titleCard}>
        <div className={s.infoUser}>
          <div className={s.personData}>
            {elem.avatar ? (
              <img src={elem.avatar} alt={elem.avatar} />
            ) : (
              <div className={s.noName}>{elem.name[0]}</div>
            )}
            <h3>{elem.name}</h3>
          </div>
          <span className={s.time}>{elem.timeAgo}</span>
        </div>
        {elem.photo && elem.photo?.length > 0 && <Gallery img={elem.photo} />}
      </div>

      <div className={s.newsCard}>
        <h3>{elem.title}</h3>

        <div className={s.skills_item}>
          {elem.skills.map((el) => (
            <span key={el} className={s.item}>
              {el}
            </span>
          ))}
        </div>

        <p className={s.text}>{elem.textAbout}</p>
      </div>
    </div>
  );
};
