import { LoginResponseErrorType, LoginResponseType } from "../../../types/SSO/loginResponseType";

export interface InitialStateType {
 responseLogin: LoginResponseType | null;
 isAuth: boolean;
 token: string | null;
 thisMyFormsId: string;
 error: LoginResponseErrorType | null;
 loading: boolean;
}
