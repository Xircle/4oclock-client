import { CURRENT_USER } from "./../components/shared/constants";
import axios from "axios";

const data = window.localStorage.getItem(CURRENT_USER);
const tk = data && JSON.parse(data).token;
console.log(tk);

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 8000,
  headers: {
    Bearer: tk,
  },
});

export default apiClient;
