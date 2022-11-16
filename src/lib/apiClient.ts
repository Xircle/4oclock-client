import { CURRENT_USER } from "./../components/shared/constants";
import axios, { AxiosRequestConfig } from "axios";
import storage from "./storage";
import routes from "../routes";

// http://localhost:3080
const host =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API_SERVER
    : "http://localhost:3080";

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
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
    source.cancel("Request cancelled, Because token was not reflected");
    window.location.reload();
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      storage.clearItems();
      window.location.href = routes.v2Login;
    }
  },
);
