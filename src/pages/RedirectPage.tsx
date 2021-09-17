import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import AxiosClient from "../lib/apiClient";
import routes from "../routes";

export default function SocialRedirect() {
  const location = useLocation<SocialAuthResponse>();
  const history = useHistory();

  const socialRedirect = async () => {
    const EMAIL_FROM_SOCIAL = location.state?.email;
    if (!EMAIL_FROM_SOCIAL) window.location.href = "/places";
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
        console.log(res.data.data);
        window.localStorage.setItem(
          "CURRENT_USER",
          JSON.stringify(res.data.data)
        );
        history.push(routes.placeFeed);
      }
    } else {
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    socialRedirect();
  }, []);

  return <div></div>;
}