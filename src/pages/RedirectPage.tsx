import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import AxiosClient from "../lib/apiClient";
import routes from "../routes";
import Storage from "../lib/storage";
import { CURRENT_USER } from "../components/shared/constants";
import { Heading, colors } from "../styles/styles";
import styled from "styled-components";

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
        // email does not exist
        history.push("/auth", {
          ...location.state,
        });
      } else if (res.data.code === 200) {
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
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainText>네시모해?</MainText>
      <SubText>
        좋은 친구들과 &nbsp; <b>맛있는 음식</b> 먹으러 가자!
      </SubText>
      <Emoji>🍚</Emoji>
    </div>
  );
}

const MainText = styled(Heading)`
  font-weight: bold;
  font-size: 32px;
  color: #6f7789;
`;

const SubText = styled(Heading)`
  font-weight: 500;
  font-size: 18px;
  color: #6f7789;
  b {
    color: ${colors.MidBlue};
  }
`;

const Emoji = styled(Heading)`
  font-size: 125px;
`;
