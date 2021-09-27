import { CURRENT_USER } from "./../components/shared/constants";
import axios, { AxiosRequestConfig } from "axios";
import storage from "./storage";

// "http://localhost:3080/"
const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080/"
    : process.env.REACT_APP_API_SERVER || "/";

const apiClient = axios.create({
  baseURL: host,
  headers: {
    Authorization: `Bearer ${storage.getItem(CURRENT_USER)?.token || ""}`,
  },
});

export default apiClient;

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
const RELOAD_TARGET_URL = ["/user/me", "/user/profile/random"];

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const rawToken = (config.headers.Authorization as string).split(" ");

  if (
    storage.getItem(CURRENT_USER)?.["token"] &&
    !rawToken[1] &&
    RELOAD_TARGET_URL.includes(config.url!)
  ) {
    console.log("got you");
    source.cancel("Request cancelled, Because token was not reflected");
    window.location.reload();
  }
  return config;
});
