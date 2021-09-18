import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import AxiosClient from "../lib/apiClient";
import routes from "../routes";
import Storage from "../lib/storage";
import { CURRENT_USER } from "../components/shared/constants";

export default function SocialRedirect() {
  const location = useLocation<SocialAuthResponse>();
  const history = useHistory();

  const socialRedirect = async () => {
    const EMAIL_FROM_SOCIAL = location.state.email;
    const res = await AxiosClient.get<SocialRedirectResponse>(
      `auth/social/redirect?email=${EMAIL_FROM_SOCIAL}`
    );
    if (res.data.ok) {
      console.log(res.data);
      if (res.data.code === 401) {
        // email does not exists
        history.push("/auth", {
          ...location.state,
        });
      } else if (res.data.code === 201) {
        // email  exists
        Storage.setItem(CURRENT_USER, res.data.data);
        window.location.href = routes.placeFeed;
      }
    } else {
      alert("Something went wrong.");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    socialRedirect();
  }, []);

  return <div></div>;
}
