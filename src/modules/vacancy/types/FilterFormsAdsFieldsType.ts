import { TeamAnnouncementType } from "../../../types/PROFILE/accountMainGlobalType";
import { FormsFilterType } from "../../ads/types/formsFilterType";

export interface MainFilterParamsType {
 page: number;
 pageSize?: number;
 query?: string;
 formId?: string;
 cityIds?: number | null;
 genreIds?: string[];
 instrumentIds?: string[];
}

export interface VacancyFilterParamsRequestType extends MainFilterParamsType {
 vacancyOwnerFormType?: string;
 searchVacancyDocumentType?: string;
 institutionTypeId?: string;
}

export interface AdsFilterParamsRequestType extends MainFilterParamsType {
 searchAnnouncementDocumentType?: string;
 formTypes?: string;
 teamTypes?: TeamAnnouncementType;
 institutionTypeIds?: string;
 neededEmployeeTypes?: string;
 musicianTypes?: string[];
}

export interface OutletAdsType {
 filterON: boolean;
 setfilterON: (state: boolean) => void;
 filterState: FormsFilterType;
 setFilterStateFu: (data: any) => void;
}
