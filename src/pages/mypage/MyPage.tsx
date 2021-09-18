import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  Container,
  Heading,
  ContainerFlexColumn,
  Avartar,
  ContainerwithLeftRightMargin,
  FlexDiv,
  FlexColumn,
  MainText,
  SubText,
  MainBtn,
  colors,
} from "../../styles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { UserData } from "../../lib/api/types";
import { getUser } from "../../lib/api/getUser";
import Storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";

export default function MyPage() {
  const { data: userData, isLoading } = useQuery<UserData | undefined>(
    "userProfile",
    () => getUser(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log(userData, isLoading);
    if (!isLoading && !userData) {
      alert("로그인이 필요합니다!");
      window.location.href = "/";
    }
  }, [userData, isLoading]);

  const logoutBtnClickHandler = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      Storage.removeItem(CURRENT_USER);
      window.location.href = routes.placeFeed;
    }
  };

  if (isLoading) return null;

  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>마이페이지</Heading>
        <ProfileInfoDiv>
          <MyAvartarImg src={userData?.profileImageUrl} />
          <ProfileTextWrapper>
            <UserName>{userData?.username}</UserName>
            <UserDetail>
              {userData?.university} / {userData?.age}
            </UserDetail>
          </ProfileTextWrapper>
        </ProfileInfoDiv>
        <Link
          to={routes.myprofilemodifypage}
          style={{ textDecoration: "none" }}
        >
          <ModifyProfileBtn>프로필 수정하기</ModifyProfileBtn>
        </Link>
        <div style={{ height: "30px" }}></div>
        <Link to={routes.myxirclepage} style={{ textDecoration: "none" }}>
          <MainSubContainer>
            <p>신청한 써클 {userData?.reservation_count}개</p>
            <FontAwesomeIcon
              icon={faAngleRight}
              color={colors.LightGray}
              size="lg"
            />
          </MainSubContainer>
        </Link>
        <SubContainer>써클 가게 건의하기</SubContainer>
        <SubContainer>써클에게 문의하기 / 피드백 하기</SubContainer>
        <SubContainer>써클 서비스 사용자 가이드</SubContainer>
        <SubContainer>유저 신고하기</SubContainer>
        <SubContainer onClick={() => logoutBtnClickHandler()}>
          로그아웃하기
        </SubContainer>

        <Footer>
          <Row>
            <a href="https://www.instagram.com/?hl=ko" target={"_blank"}>
              <BrandImg src="/brands/instagram_logo.png" alt="instagram" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/service/service/KakaoTalk"
              target={"_blank"}
            >
              <BrandImg src="/brands/kakao_logo.png" alt="kakao" />
            </a>
            <a href="https://www.youtube.com/" target={"_blank"}>
              <BrandImg src="/brands/youtube_logo.png" alt="youtube" />
            </a>
          </Row>
          <a>
            <AgreeText>개인정보처리방침</AgreeText>
          </a>
          <a>
            <AgreeText>마케팅 수신동의 이용약관</AgreeText>
          </a>
        </Footer>
      </ContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="mypage"></BottomNavBar>
    </ContainerFlexColumn>
  );
}

const ModifyProfileBtn = styled(MainBtn)`
  margin-top: 12px;
  background-color: white;
  border-radius: 8px;
  color: ${colors.MidBlue};
  border: 1px solid ${colors.MidBlue};
  filter: none;
  box-shadow: none;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
`;

const MyAvartarImg = styled(Avartar)`
  width: 68px;
  height: 68px;
`;

const ProfileInfoDiv = styled(FlexDiv)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: start;
`;

const ProfileTextWrapper = styled(FlexColumn)`
  margin-left: 22px;
`;

const UserName = styled(MainText)`
  font-weight: 500;
  font-size: 16px;
`;

const UserDetail = styled(SubText)`
  font-size: 13px;
  font-weight: 500;
`;

const SubContainer = styled(Container)`
  color: ${colors.Black};
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  margin-top: 19px;
  cursor: pointer;
`;

const MainSubContainer = styled(SubContainer)`
  margin-top: 25px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: 60px;
`;

const BrandImg = styled.img``;
const AgreeText = styled.p`
  color: #a7b0c0;
  line-height: 20px;
  font-size: 13px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  a {
    margin: 10px 10px 10px 0;
  }
`;
