import { SwiperGalleryPortfolio } from "../../../../../modules/user/SwiperGalleryPortfolio";
import { PortfolioType } from "../../../../../types/PROFILE/accountMainGlobalType";
import { AboutProfileSkillsLayout } from "../../../../layout/aboutProfileSkillsLayout/AboutProfileSkillsLayout";
import s from "../aboutProfile.module.scss";

interface PortfolioElementType {
 portfolio_photo: PortfolioType[] | null;
 watchAccountType: {
  watchMisician: boolean;
  watchTeam: boolean;
 };
 inspiration: string | string[];
}

export const Portfolio = ({
 portfolio_photo,
 watchAccountType,
 inspiration,
}: PortfolioElementType) => {
 if (portfolio_photo?.length === 0 && !inspiration) return null;
 if (
  portfolio_photo?.length === 0 &&
  !watchAccountType.watchMisician &&
  !watchAccountType.watchTeam
 )
  return null;

 return (
  <>
   <AboutProfileSkillsLayout skillsCategoryTitle="Портфолио">
    {(watchAccountType.watchMisician || watchAccountType.watchTeam) && inspiration && (
     <span className={s.styleAbout}>
      <span className={s.titleSpan}>О себе:</span>

      <pre className={s.tagPreFormatter}>{inspiration}</pre>
     </span>
    )}

    {portfolio_photo && (
     <span style={{ width: "100%" }}>
      <SwiperGalleryPortfolio inspiration={portfolio_photo} skillsCategoryTitle="" />
     </span>
    )}
   </AboutProfileSkillsLayout>
  </>
 );
};
