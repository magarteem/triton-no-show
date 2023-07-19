import axios from "axios";
import { variableApiURL_PROFILE } from "./variableApiURL";
import apiSSO from "./axiosConfigSSO";
import { notAuthLogout } from "./helpers";

export const apiProfile = axios.create({
 baseURL: `${process.env.REACT_APP_API_URL_PROFILE}/${variableApiURL_PROFILE}`,
});

apiProfile.interceptors.request.use(
 async (config: any) => {
  const tokenLocalStorage = localStorage.getItem(`auth-token`);

  if (tokenLocalStorage) {
   config.headers = {
    Authorization: `Bearer ${tokenLocalStorage}`,
    Accept: "application/json",
   };
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

apiProfile.interceptors.response.use(
 (response) => {
  return response;
 },
 async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._isRetry) {
   originalRequest._isRetry = true;

   try {
    const access_token = await apiSSO.post(`auth/refresh_token`);
    localStorage.setItem("auth-token", `${access_token.data.token.value}`);

    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    return apiProfile.request(originalRequest);
   } catch (error) {
    notAuthLogout();
   }
   throw error;
  }
  return Promise.reject(error);
 }
);

export default apiProfile;
