import { CURRENT_USER } from "./../components/shared/constants";
import axios from "axios";
import storage from "./storage";

const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : process.env.REACT_APP_API_HOST || "/";

const apiClient = axios.create({
  baseURL: host,
  headers: {
    Authorization: `Bearer ${storage.getItem(CURRENT_USER)?.token}`,
  },
});

export default apiClient;
