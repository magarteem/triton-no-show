import { ResponseGlobalType } from "../../api/types/ResponseGlobalType";

export interface CityResultsType {
 id: number;
 title: string;
 countryTitle: string | null;
 regionTitle: string | null;
 important: boolean;
 metros?: [];
}

export interface CityGlobalType extends ResponseGlobalType {
 results: CityResultsType[];
}
