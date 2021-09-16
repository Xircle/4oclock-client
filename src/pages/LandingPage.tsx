import { useState } from "react";
import styled from "styled-components";
import {
  Container,
  ProcedureHeading,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
} from "../styles";
import KakaoLogin from "react-kakao-login";
import { LoginResponse, UserProfile } from "../lib/kakao";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const kakaoSuccessCallback = (response: {
    response: LoginResponse;
    profile?: UserProfile | undefined;
  }) => {
    history.push("/social/redirect", {
      uid: response.profile?.id,
      thumbnail: response.profile?.properties.thumbnail_image_url,
      username: response.profile?.properties.nickname,
      email: response.profile?.kakao_account.email,
      gender: response.profile?.kakao_account.gender,
    });
  };

  return (
    <ContainerWithBg>
      <ContainerwithLeftRightMargin>
        <FlexColumn>
          <Row>
            <Heading>안암에서 만나는</Heading>
            <Heading>연대친구, 써클</Heading>
          </Row>
          <Row>
            <p>Login</p>
            <form style={{ display: "flexColumn" }}>
              <InputBlock>
                <InputWhite value={email} placeholder="이메일" />
                <InputWhite value={password} placeholder="비밀번호" />
              </InputBlock>
            </form>
            <LoginBtn>로그인하기</LoginBtn>
            <p style={{ textAlign: "center", margin: "10px 0" }}>또는</p>
            <KakaoLogin
              token={process.env.REACT_APP_KAKAO_KEY!}
              onSuccess={kakaoSuccessCallback}
              onFail={() => console.log("hi")}
              onLogout={() => console.log("hi")}
              style={{
                width: "300px",
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
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Row>
        </FlexColumn>
      </ContainerwithLeftRightMargin>
    </ContainerWithBg>
  );
}

const ContainerWithBg = styled(Container)`
  background-color: lightgray;
`;

const Heading = styled(ProcedureHeading)`
  padding-top: 50px;
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
  background-color: #fff;
  color: ${colors.Black};
  margin: 1.25rem 0;
  filter: none;
  margin-left: auto;
  margin-right: auto;
`;

const KakaoBtn = styled(MainBtn)`
  background-color: #fff;
  color: ${colors.Black};
  margin: 1.25rem 0;
  margin-left: auto;
  margin-right: auto;
`;

const InputWhite = styled.input`
  padding: 10px;
  width: 90%;
  margin: 5px 0;
  background: none;
  color: white;
  border: 1px solid white;
  ::placeholder {
    color: white;
  }
`;

export default LandingPage;
