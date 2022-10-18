import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../../../lib/kakao";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import storage from "../../../lib/storage";
import { CURRENT_USER } from "../../../components/shared/constants";
import routes from "../../../routes";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

function V2LoginPage() {
  const history = useHistory();

  useEffect(() => {
    if (storage.getItem(CURRENT_USER) && storage.getItem(CURRENT_USER).token) {
      window.location.href = routes.v2Root;
      return;
    }
  }, []);

  const kakaoSuccessCallback = (response: {
    response: LoginResponse;
    profile?: any;
  }) => {
    process.env.NODE_ENV === "development" && console.log(response);
    history.push("/v2/social/redirect", {
      uid: response.profile?.id,
      thumbnail: response.profile?.kakao_account.profile.profile_image_url,
      username: response.profile?.properties.nickname,
      email: response.profile?.kakao_account.email,
      gender: response.profile?.kakao_account.gender,
    });
  };

  return (
    <Container>
      <V2SubHeaderC />
      <Body>
        <img src="/club_logo.png" width="285px" height="160px" />

        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_KEY!}
          onSuccess={kakaoSuccessCallback}
          onFail={() => console.log("kakao login fail")}
          onLogout={() => console.log("hi")}
          render={({ onClick }) => {
            return (
              <a
                onClick={(e: any) => {
                  e.preventDefault();
                  onClick();
                }}
                style={{
                  width: "333px",
                  height: "50px",
                  background: "#FFE812",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  color: "#1A1C2D",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 50,
                }}
              >
                카카오톡으로 1초만에 시작하기
              </a>
            );
          }}
        />
        <InquiryText>혹시 로그인이 안되시나요?</InquiryText>
      </Body>
    </Container>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
`;

const InquiryText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-decoration-line: underline;
  margin-top: 52px;
  color: #6f7789;
`;

export default V2LoginPage;
