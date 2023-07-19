export interface ErrorsCodeType {
 [key: number]: {
  title: string;
 };
}

export const errorCodeResponse = (err: number): string => {
 const errCode: ErrorsCodeType = {
  2004: {
   title: "Емаил занят",
  },
  401: {
   title: "Не авторизован",
  },
  500: {
   title: "Ошибка запроса",
  },
  0: {
   title: "Не известная ошибка",
  },
 };

 console.error("Ошибка запроса:", `${err}, ${err ? errCode[err]?.title : ""}`);
 return `№:${err} ${err ? errCode[err]?.title ?? "Неизвестная ошибка" : ""}`;
};
