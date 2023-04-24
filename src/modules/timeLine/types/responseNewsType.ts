import { ResponseGlobalType } from "../../../api/types/ResponseGlobalType";
import { PortfolioType } from "../../../types/PROFILE/accountMainGlobalType";
import { CityResultsType } from "../../../types/PROFILE/cityGlobalType";
import { GenreSliceType, ToolsSliceType } from "../../user/types/userSliceType";

export interface FormNewsType {
 formId: string;
 name: string;
 avatar: PortfolioType;
 city: CityResultsType;
 address: string | null;
 type: string;
}

export interface NewsResultType {
 id: string;
 body: string;
 type: string;
 form: FormNewsType;
 city: CityResultsType;
 attachments: PortfolioType[];
 genres: GenreSliceType[];
 instruments: ToolsSliceType[];
 createdDate: string;
}

export interface ResponseNewsType extends ResponseGlobalType {
 results: NewsResultType[];
}
