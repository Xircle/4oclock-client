import { useHistory } from "react-router-dom";
import routes from "../routes";
export const checkResponseStatus = (status: number): void => {
  if (status === 401 || status === 403) {
    localStorage.clear();
  }
};
