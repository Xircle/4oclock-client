import { CURRENT_USER } from "./../components/shared/constants";
import axios from "axios";

const data = window.localStorage.getItem(CURRENT_USER);
const tk = data && JSON.parse(data).token;
console.log(tk);

const apiClient = axios.create({
  baseURL: "http://172.30.1.46:5000/",
  timeout: 8000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDM4ODJhLTJiODQtNDAyMS1hNmI4LTg2NjYyZmI3ZjVkZSIsImlhdCI6MTYzMTk0NDY3OCwiZXhwIjoxNjMxOTU1NDc4fQ.J1iP3naishFq16pTRKqygATgWM5W5tI3Dpr9vNfWtkc`,
  },
});

export default apiClient;
