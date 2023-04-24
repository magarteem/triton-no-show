import { InterfaceGlobalSelectType } from "../../../types/interfaseGlobal/interfaseGlobalSelect";
import { EnumEmploymentType } from "../../../types/PROFILE/enum/EnumEmploymentType";
import { EnumTypeDocumentType } from "../../../types/PROFILE/enum/EnumTypeDocumentType";
import { EnumTypeTeam } from "../../../types/PROFILE/enum/EnumTypeTeam";

//!         Vacancy
export const requiredVacancy: InterfaceGlobalSelectType[] = [
 { id: EnumTypeDocumentType.MUSICIAN, name: "Музыкант" },
 { id: EnumTypeDocumentType.TEAM, name: "Коллектив" },
 { id: EnumTypeDocumentType.SOUND_PRODUCER, name: "Звукорежиссёр" },
];

//!         ADS
export const requiredADS: InterfaceGlobalSelectType[] = [
 { id: EnumTypeDocumentType.WORK, name: "Работу" },
 { id: EnumTypeDocumentType.MUSICIAN, name: "Музыканта" },
 { id: EnumTypeDocumentType.TEAM, name: "Коллектив" },
];

//!          тип коллектива
export const teamTypeADS: InterfaceGlobalSelectType[] = [
 { id: EnumTypeTeam.ENSEMBLE, name: "Ансамбль" },
 { id: EnumTypeTeam.GROUP, name: "Группа" },
 { id: EnumTypeTeam.ORCHESTRA, name: "Оркестр" },
];

export const workingConditionsBD: InterfaceGlobalSelectType[] = [
 {
  id: EnumEmploymentType.PART_TIME_EMPLOYMENT,
  name: "Частичная занятость",
 },
 { id: EnumEmploymentType.FULL_EMPLOYMENT, name: "Полная занятость" },
 { id: EnumEmploymentType.FREE_TIME_EMPLOYMENT, name: "В свободное время" },
 { id: EnumEmploymentType.BUSY_WORK, name: "Напряженный график" },
];
