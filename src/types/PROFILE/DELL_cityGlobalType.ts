export interface CityResultsType {
 id: number;
 title: string;
 countryTitle: string | null;
 regionTitle: string | null;
 important: boolean;
 metros?: [];
}

export interface CityGlobalType {
 currentPage: number;
 pageCount: number;
 pageSize: number;
 rowCount: number;
 results: CityResultsType[];
}
