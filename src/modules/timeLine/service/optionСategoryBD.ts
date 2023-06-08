import { InterfaceGlobalSelectType } from "../../../types/interfaseGlobal/interfaseGlobalSelect";
import { EnumNewsThemeType } from "../../../types/PROFILE/enum/EnumNewsThemeType";

export const optionСategoryBD: InterfaceGlobalSelectType[] = [
 { id: EnumNewsThemeType.PLAYBILL, name: "Афиша" },
 { id: EnumNewsThemeType.MUSIC_NEWS, name: "В мире музыки" },
 { id: EnumNewsThemeType.MEME, name: "Мемология" },
 {
  id: EnumNewsThemeType.TECHNICAL_QUESTION,
  name: "Обсуждения / вопросы",
 },
 // на будующее >>> { id: EnumNewsThemeType.TRITONE, name: 'Журнал "Тритон"' },
];

export const selectTypeNews: { [key: string]: string } = {
 MusicNews: "В мире музыки",
 Tritone: "Журнал Тритон",
 Playbill: "Афиша",
 Meme: "Мемология",
 TechnicalQuestion: "Обсуждения / вопросы",
 Ads: "АДС",
};
