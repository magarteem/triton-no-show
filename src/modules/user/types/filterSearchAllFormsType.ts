export interface FilterSearchAllFormsType {
 page: number;
 pageSize?: number;
 query?: string;
 // formId?: string;
 cityIds?: number | null;
 genreIds?: string[];
 instrumentIds?: string[];
 institutionTypeId?: string;
 gender?: string;
 ageStart?: number;
 ageEnd?: number;
 master?: string; //пока не реализовано на бэке
 teamTypes?: string;
 formType?: string;
}
