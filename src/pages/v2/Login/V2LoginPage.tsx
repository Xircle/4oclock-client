import styled from "styled-components";
import { ProcedureHeading, MainBtn, colors } from "../../../styles/styles";
import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../../../lib/kakao";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { isSamsungBrowser } from "react-device-detect";
import Modal from "../../../components/UI/Modal";
import storage from "../../../lib/storage";
import { CURRENT_USER } from "../../../components/shared/constants";
import routes from "../../../routes";

function V2LoginPage() {
  const history = useHistory();
  const [isSamsungBrowserBool, setIsSamsungBrowserBool] = useState(false);

  useEffect(() => {
    if (storage.getItem(CURRENT_USER) && storage.getItem(CURRENT_USER).token) {
      window.location.href = routes.v2Root;
      return;
    }
    if (isSamsungBrowser) setIsSamsungBrowserBool(true);
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
      {isSamsungBrowserBool && (
        <Modal
          isClose={!isSamsungBrowserBool}
          onClose={() => setIsSamsungBrowserBool((prev) => !prev)}
        >
          <ModalWrapper>
            <h1>크롬 or 사파리로 접속해주세요!</h1>
            <p>
              삼성 브라우저에서 회원가입이 잘되지 않는 이슈를 발견했어요!
              <br />
              <br />
              원활한 접속을 위해 크롬 or 사파리로 접속해주세요
            </p>
            <MainBtn
              onClick={() => setIsSamsungBrowserBool(false)}
              style={{ width: "90%" }}
            >
              알겠습니다
            </MainBtn>
          </ModalWrapper>
        </Modal>
      )}

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
                boxShadow: "rgba(75, 88, 208, 0.5) 0px 25px 20px -20px",
              }}
            >
              카카오톡으로 1초만에 시작하기
            </a>
          );
        }}
      />
    </Container>
  );
}

const Footer = styled.div`
  background-color: #e7ecf3;
  width: 100%;
  min-height: 250px;
`;

const FooterInnerContainer = styled.div`
  padding-left: 21px;
  padding-top: 28px;
  padding-bottom: 50px;
  font-size: 12px;
  line-height: 23px;
  color: #a7b0c0;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #a7b0c0;
  }
  b {
    font-weight: bold;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const MainBox = styled.div`
  height: 100vh;
  position: relative;
`;

const MainInfo = styled.p`
  padding-top: 0.5vh;
  font-weight: normal;
  color: #5e5e5e;
  font-size: 15px;
  line-height: 20px;
  margin-left: 28px;
  b {
    color: ${colors.MidBlue};
  }
`;

const Heading = styled(ProcedureHeading)`
  padding-top: 8vh;
  margin-left: 28px;
  line-height: 37px;
  & + & {
    padding: 13px 0;
  }
`;

const Row = styled.div``;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 10px 40px;
  h1 {
    color: #12121d;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }
  p {
    color: #18a0fb;
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
  }
`;

export default V2LoginPage;
