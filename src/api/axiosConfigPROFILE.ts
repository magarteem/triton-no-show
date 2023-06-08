import axios from "axios";
import { variableApiURL_PROFILE } from "./variableApiURL";
import apiSSO from "./axiosConfigSSO";

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

//apiProfile.interceptors.response.use(
// (response) => {
//  return response;
// },
// async function (error) {
//  const originalRequest = error.config;
//  if (error.response.status === 401 || (error.response.status === 404 && !originalRequest._retry)) {
//   originalRequest._retry = true;
//   const access_token = await apiSSO.post(`auth/refresh_token`);
//   localStorage.setItem("auth-token", `${access_token.data.token.value}`);
//   console.log("access_token", access_token);
//   axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//   return apiProfile(originalRequest);
//  }
//  return Promise.reject(error);
// }
//);

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
    console.log("НЕ АВТОРИЗОВАН");
    localStorage.removeItem(`auth-token`);
    localStorage.removeItem(`active-my-forms`);
    localStorage.removeItem(`active-forms-id`);

    window.location.reload();
   }
   throw error;
  }
  return Promise.reject(error);
 }
);

export default apiProfile;
