export interface ErrorsCodeType {
 [key: number]: {
  Type: string;
  Message: string;
  Code: number;
  title: string;
 };
}

export const errorsCode: ErrorsCodeType = {
 2004: {
  Code: 2004,
  title: "Емаил занят",
  Type: "AccountException",
  Message: "Exception of type 'Triton.SSO.Domain.Exceptions.AccountException' was thrown",
 },
 401: {
  Code: 401,
  title: "Unauthorized",
  Type: "ERR_BAD_REQUEST",
  Message: "Request failed with status code 401",
 },
};
