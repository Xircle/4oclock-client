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
import { DummyAvartar } from "../../dummyResources/dummyData";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

export default function MyPage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>마이페이지</Heading>
        <ProfileInfoDiv>
          <MyAvartarImg src={DummyAvartar} />
          <ProfileTextWrapper>
            <UserName>희원짱</UserName>
            <UserDetail>고려대학교 / 20초반</UserDetail>
          </ProfileTextWrapper>
        </ProfileInfoDiv>
        <Link
          to={routes.myprofilemodifypage}
          style={{ textDecoration: "none" }}
        >
          <ModifyProfileBtn>프로필 수정하기</ModifyProfileBtn>
        </Link>
        <Link to={routes.myxirclepage} style={{ textDecoration: "none" }}>
          <MainSubContainer>
            <p>신청한 써클 8개</p>
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
        <SubContainer>로그아웃하기</SubContainer>
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
`;

const MainSubContainer = styled(SubContainer)`
  margin-top: 25px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
