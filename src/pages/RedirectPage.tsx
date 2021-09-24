import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import AxiosClient from "../lib/apiClient";
import routes from "../routes";
import Storage from "../lib/storage";
import { CURRENT_USER } from "../components/shared/constants";
import { Heading } from "../styles/styles";

export default function SocialRedirect() {
  const location = useLocation<SocialAuthResponse>();
  const history = useHistory();

  const socialRedirect = async () => {
    const EMAIL_FROM_KAKAO = location.state.email;
    const res = await AxiosClient.get<SocialRedirectResponse>(
      `auth/social/redirect/kakao?email=${EMAIL_FROM_KAKAO}`
    );
    console.log(res);
    if (res.data.ok) {
      if (res.data.code === 401) {
        // email does not exists
        history.push("/auth", {
          ...location.state,
        });
      } else if (res.data.code === 201) {
        // email  exists
        Storage.setItem(CURRENT_USER, res.data.data);
        window.location.href = `${routes.placeFeed}?isLoggedIn=true`;
      }
    } else {
      alert("Something went wrong.");
      window.location.href = routes.root;
    }
  };

  useEffect(() => {
    socialRedirect();
  }, []);

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading>Xircle에서 새로운</Heading>
      <Heading> 네트워킹을 경험하세요</Heading>
    </div>
  );
}
