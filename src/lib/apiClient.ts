import { CURRENT_USER } from "./../components/shared/constants";
import axios from "axios";

const data = window.localStorage.getItem(CURRENT_USER);
const tk = data && JSON.parse(data).token;
console.log(tk);

const apiClient = axios.create({
  baseURL: "http://172.30.1.27:5000/",
  timeout: 8000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTEyMTllLTk1YmMtNDY0NS1hZDM2LTYxYzc3NzFhZWMyZSIsImlhdCI6MTYzMTg2Nzk3MSwiZXhwIjoxNjMxODc4NzcxfQ.fbPXKqWzSXHPKED3hOCsZpY27C79oe-Bwv83zixBy7w`,
  },
});

export default apiClient;
