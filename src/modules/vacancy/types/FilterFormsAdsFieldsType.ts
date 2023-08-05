import { FormsFilterType } from "../../ads/types/formsFilterType";

export interface MainFilterParamsType {
 page: number;
 pageSize?: number;
 query?: string;
 formId?: string;
 cityIds?: number | null;
 genreIds?: string[];
 instrumentIds?: string[];
 gender?: string;
 fromAge?: number | null;
 toAge?: number | null;
 teamTypes?: string;
 master?: string; //пока не реализовано на бэке
}

export interface VacancyFilterParamsRequestType extends MainFilterParamsType {
 vacancyOwnerFormType?: string;
 searchVacancyDocumentType?: string;
 institutionTypeId?: string;
}

export interface AdsFilterParamsRequestType extends MainFilterParamsType {
 searchAnnouncementDocumentType?: string;
 institutionTypeIds?: string;
 neededEmployeeTypes?: string;
 musicianTypes?: string[];
 formTypes?: string;
}

export interface OutletAdsType {
 filterON: boolean;
 setfilterON: (state: boolean) => void;
 filterState: FormsFilterType;
 setFilterStateFu: (data: any) => void;
}
