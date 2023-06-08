import axios from "axios";
import { variableApiURL_SSO } from "../variableApiURL";

const authApi = axios.create({
 baseURL: `${process.env.REACT_APP_API_URL_SSO}/${variableApiURL_SSO}`,
 headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
 },
 // withCredentials: true,
});
export default authApi;
