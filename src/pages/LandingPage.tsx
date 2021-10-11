import styled from "styled-components";
import {
  ProcedureHeading,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
  SubText,
  FlexDiv,
  LinkWithoutUnderLine,
} from "../styles/styles";
import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../lib/kakao";
import { useHistory } from "react-router-dom";
import * as links from "../components/shared/Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { isSamsungBrowser } from "react-device-detect";
import Modal from "../components/UI/Modal";
import storage from "../lib/storage";
import { CURRENT_USER } from "../components/shared/constants";
import routes from "../routes";

function LandingPage() {
  const history = useHistory();
  const [isSamsungBrowserBool, setIsSamsungBrowserBool] = useState(false);

  useEffect(() => {
    if (storage.getItem(CURRENT_USER) && storage.getItem(CURRENT_USER).token) {
      window.location.href = routes.placeFeed;
      return;
    }
    console.log(isSamsungBrowser);
    if (isSamsungBrowser) setIsSamsungBrowserBool(true);
  }, []);

  const kakaoSuccessCallback = (response: {
    response: LoginResponse;
    profile?: any;
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
      <MainBox>
        <img src="/landingPage/LandingPageMain.jpeg" />
        <Row>
          <Heading>
            안암{"/"}신촌에서 만나는 <br /> 연.고.이대 친구 <br /> 연고이팅{" "}
            {"👋"}
          </Heading>
        </Row>
        <Row style={{ paddingTop: "3vh" }}>
          <MainInfo>
            취향이 비슷한 대학 친구들과
            <br />
            <b>먹고 마시고, 웃고 떠들며 함께 놀러가실 분?!</b>
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
          <div style={{ position: "relative" }}>
            <img
              src="/landingPage/kakao.svg"
              style={{
                position: "absolute",
                left: "2.25rem",
                top: "25%",
                transform: "translate(0, -50%)",
              }}
            />

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
            <FlexDiv style={{ paddingTop: "30px" }}>
              연고이팅 소개
              <FontAwesomeIcon
                icon={faChevronDown}
                color={colors.Black}
                style={{ paddingLeft: "5px" }}
              />
            </FlexDiv>
          </div>
        </Row>
      </MainBox>
      <SubBox>
        <FlexDiv>
          <HeadingSubBox>
            맛집 모임으로
            <br />
            <b>대학친구</b> 사귀기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>미팅의 시대는 갔다. 이팅의 시대다.</TextSubBox>
        </FlexDiv>
        <FlexDiv>
          <img src="/landingPage/SubPic1.webp" width="359px" height="389px" />
        </FlexDiv>
      </SubBox>
      <SubBox style={{ height: "1000px" }}>
        <FlexDiv>
          <HeadingSubBox>
            함께할 친구들
            <br />
            <b>프로필</b> 둘러보기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>이팅모임을 함께 할 친구의 취향을 확인하기</TextSubBox>
        </FlexDiv>
        <FullContainerWithLeftAndRightMargin>
          <FlexDiv>
            <img src="/landingPage/SubPic2.webp" width="371px" height="178px" />
          </FlexDiv>
          <FlexDiv>
            <img src="/landingPage/SubPic3.webp" width="320px" height="475px" />
          </FlexDiv>
        </FullContainerWithLeftAndRightMargin>
      </SubBox>
      <SubBox>
        <FlexDiv>
          <HeadingSubBox>
            좋은 친구들과
            <br />
            <b>맛있는 음식</b> 먹으며
            <br />
            모임 즐기기
          </HeadingSubBox>
        </FlexDiv>
        <FlexDiv>
          <TextSubBox>남은 2021년 청춘 여기서 불태우자{"!"}</TextSubBox>
        </FlexDiv>
        <FlexDiv>
          <img src="/landingPage/SubPic4.webp" width="281px" height="456px" />
        </FlexDiv>
      </SubBox>
      <FlexDiv>
        <div style={{ position: "relative", margin: "2.25rem 0 7rem" }}>
          <img
            src="/landingPage/kakao.svg"
            style={{
              position: "absolute",
              left: "2.25rem",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          />
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
        </div>
      </FlexDiv>
      <Footer>
        <FooterInnerContainer>
          <b>(팀)연고링</b>
          <br />
          대표: 양희원
          <br />
          주소: 서울특별시 성북구 안암로 145, 2층 214호 경영대학 본관
          <br />
          사업자등록번호 749-16-01653{" "}
          <a href={""} target={"_blank"}>
            사업자 정보 확인
          </a>
          <br />
          문의: 연고이팅{" "}
          <GrayLink href={links.LOpenKakaoChat}>카카오톡 채널</GrayLink> /{" "}
          <GrayLink href={links.LInstagram}>인스타그램</GrayLink>
          <br />
          서비스 소개: <GrayLink href={links.LServiceGuide}>연고이팅</GrayLink>
          <br />
          <GrayLink href={links.LLocationAgree} target={"_blank"}>
            이용약관
          </GrayLink>
          <br />
          <GrayLink href={links.LPrivacyAgree} target={"_blank"}>
            개인정보처리방침
          </GrayLink>
          <br />
          {"ⓒ "}연고링 all rights reserved
          <br />
          <SNSIconContainer>
            <a href={links.LInstagram} target={"_blank"}>
              <BrandIcon src="/brands/instagram_logo.svg" alt="instagram" />
            </a>
            <a href={links.LKakao} target={"_blank"}>
              <BrandIcon
                marginLeft={"10px"}
                src="/brands/kakao_logo.svg"
                alt="kakao"
              />
            </a>
            <a href={links.LYoutube} target={"_blank"}>
              <BrandIcon
                marginLeft={"10px"}
                src="/brands/youtube_logo.svg"
                alt="youtube"
              />
            </a>
          </SNSIconContainer>
        </FooterInnerContainer>
      </Footer>
    </Container>
  );
}

const BrandIcon = styled.img<{ marginLeft?: string }>`
  width: 30px;
  height: 30px;
  margin-left: ${(props) => props?.marginLeft || "0px"};
  margin-top: 10px;
  margin-bottom: 7px;
`;

const SNSIconContainer = styled.div``;

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

const FullContainerWithLeftAndRightMargin = styled(
  ContainerwithLeftRightMargin
)`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
`;

const SubBox = styled(FlexColumn)`
  height: 650px;
`;

const HeadingSubBox = styled.p`
  color: ${colors.Black};
  font-size: 32px;
  font-weight: bold;
  line-height: 42px;
  text-align: center;
  b {
    color: ${colors.MidBlue};
  }
`;

const TextSubBox = styled.p`
  color: ${colors.MidGray};
  font-size: 17px;
  text-align: center;
`;

const MainBox = styled.div`
  height: 100vh;
  position: relative;
`;
const MainDetail = styled(SubText)`
  font-size: 13px;
  margin: 5px 0;
  line-height: 20px;
  text-align: center;
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

const GrayLink = styled(LinkWithoutUnderLine)`
  color: #a7b0c0;
`;

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

export default LandingPage;
