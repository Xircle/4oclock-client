import { useHistory } from "react-router-dom";
import routes from "../routes";
export const checkResponseStatus = (status: number): void => {
  const history = useHistory();
  if (status === 401 || status === 403) {
    localStorage.clear();
    history.push(routes.v2Root);
  }
};
