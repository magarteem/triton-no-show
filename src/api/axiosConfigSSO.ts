import axios from "axios";
import { variableApiURL_SSO } from "./variableApiURL";

export const apiSSO = axios.create({
 baseURL: `${process.env.REACT_APP_API_URL_SSO}/${variableApiURL_SSO}`,
});

apiSSO.interceptors.request.use(
 (config: any) => {
  const tokenLocalStorage = localStorage.getItem(`auth-token`);

  if (tokenLocalStorage) {
   config.headers.Authorization = `Bearer ${tokenLocalStorage}`;
   config.headers.Accept = `application/json`;
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);
export default apiSSO;
