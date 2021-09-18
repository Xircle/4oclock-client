import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import AxiosClient from "../lib/apiClient";
import routes from "../routes";
import Storage from "../lib/storage";
import { CURRENT_USER } from "../components/shared/constants";
import { toast } from "react-toastify";

export default function SocialRedirect() {
  const location = useLocation<SocialAuthResponse>();
  const history = useHistory();

  const socialRedirect = async () => {
    const EMAIL_FROM_SOCIAL = location.state.email;
    const res = await AxiosClient.get<SocialRedirectResponse>(
      `auth/social/redirect?email=${EMAIL_FROM_SOCIAL}`
    );
    if (res.data.ok) {
      if (res.data.code === 401) {
        // email does not exists
        history.push("/auth", {
          ...location.state,
        });
      } else if (res.data.code === 201) {
        // email  exists
        toast.success("다시 돌아오신 것을 환영합니다!", {
          position: toast.POSITION.TOP_CENTER,
        });
        Storage.setItem(CURRENT_USER, res.data.data);
        history.push(routes.placeFeed);
      }
    } else {
      alert("Something went wrong.");
      window.location.href = routes.root;
    }
  };

  useEffect(() => {
    socialRedirect();
  }, []);

  return <div></div>;
}
