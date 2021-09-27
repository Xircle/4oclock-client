import { useState } from "react";
import styled from "styled-components";
import {
  Container,
  ProcedureHeading,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
  SubText,
} from "../styles/styles";
import KakaoLogin from "react-kakao-login";
import { LoginResponse, UserProfile } from "../lib/kakao";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  const kakaoSuccessCallback = (response: {
    response: LoginResponse;
    profile?: UserProfile | undefined;
  }) => {
    process.env.NODE_ENV === "development" && console.log(response);
    history.push("/social/redirect", {
      uid: response.profile?.id,
      thumbnail: response.profile?.kakao_account.profile.profile_image_url,
      username: response.profile?.properties.nickname,
      email: response.profile?.kakao_account.email,
      gender: response.profile?.kakao_account.gender,
    });
  };

  return (
    <ContainerWithBg>
      <MainBox>
        <img src="/landingPage/LandingPageMain.jpeg" />
        <Row>
          <Heading>
            안암{"/"}신촌에서 만나는 <br /> 연고대 친구 <br /> 네시모해 {"👋"}
          </Heading>
        </Row>
        <Row style={{ paddingTop: "3vh" }}>
          <MainInfo>
            취향이 비슷한 대학 친구들과
            <br />
            <b>먹고 마시고, 웃고 떠들며 함께 놀러가는</b>
            <br />
            대학생 맛집매칭 서비스입니다{"."}
            <br />
            새내기 {"/"} 졸업생 {"/"} 대학원생 누구나{"!"}
          </MainInfo>
        </Row>
        <Row
          style={{
            position: "absolute",
            bottom: "10vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <MainDetail>
            {"※ "}현재는 고려대{"/"}연세대{"/"}이화여대 학교로만 운영중이에요
          </MainDetail>
          <KakaoLogin
            token={process.env.REACT_APP_KAKAO_KEY!}
            onSuccess={kakaoSuccessCallback}
            onFail={() => console.log("kakao login fail")}
            onLogout={() => console.log("hi")}
            style={{
              width: "333px",
              height: "50px",
              padding: "1.25rem 0",
              background: "rgb(255, 235, 0)",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bolder",
              cursor: "pointer",
              color: colors.Black,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(75, 88, 208, 0.5) 0px 25px 20px -20px",
            }}
          />
        </Row>
      </MainBox>
      <ContainerwithLeftRightMargin></ContainerwithLeftRightMargin>
    </ContainerWithBg>
  );
}

const MainBox = styled.div`
  height: 100vh;
  position: relative;
`;
const MainDetail = styled(SubText)`
  font-size: 13px;
  line-height: 20px;
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

const ContainerWithBg = styled(Container)``;

const Heading = styled(ProcedureHeading)`
  padding-top: 8vh;
  margin-left: 28px;
  line-height: 37px;
  & + & {
    padding: 13px 0;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
`;
const Row = styled.div``;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBtn = styled(MainBtn)`
  margin: 1.25rem 0;
  filter: none;
  margin-left: auto;
  margin-right: auto;
`;

const InputIdPwd = styled.input`
  padding: 10px;
  width: 100%;
  margin: 5px 0;
  background: none;
  ::placeholder {
  }
`;

export default LandingPage;
