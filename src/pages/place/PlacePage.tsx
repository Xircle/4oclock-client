import styled from "styled-components";
import PostMainPicDummy from "../../dummyResources/PostMainPicDummy.png";
import PostSubPicDummy from "../../dummyResources/PostSubPicDummy.png";
import Avartar1 from "../../dummyResources/Avartar1.png";
import {
  colors,
  Container,
  MainBtn,
  SpaceForNavBar,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
} from "../../styles";
import Header from "../../components/shared/Header/Header";
import HeaderTextHeading from "../../components/shared/Header/HeaderTextHeading";
import HeaderTextDescription from "../../components/shared/Header/HeaderTextDescription";
import Avartar from "../../components/shared/Avartar";
import routes from "../../routes";
import { Link } from "react-router-dom";

interface Props {}

export default function PlacePage(props: Props) {
  return (
    <>
      <Container>
        <Header src={PostMainPicDummy}>
          <HeaderTextHeading>안암 막걸리 찬가</HeaderTextHeading>
          <HeaderTextDescription>
            내일 / 서울 용상구 보광로 60길 14-38 <br />
            20세~26세
          </HeaderTextDescription>
        </Header>
        <ContainerDescription>
          <p>
            새내기 미팅은 여기서!! 코로나 학번 모여라~~~
            <br />
            준비물은 청춘과 체력! 같이 이런저런 이야기 하면서 놀아요 ㅎ<br />
            나이 상관 없이 즐기는 광란의 안암 프리즘!
            <br />
            좋은 추억 쌓아보아요!
            <br />
          </p>
          <DetailDescription>
            <p>가계 정보 더보기</p>
          </DetailDescription>
        </ContainerDescription>
        <GridContainer>
          <GridRow>
            <GridPic src={PostSubPicDummy} />
            <GridPic src={PostSubPicDummy} />
            <GridPic src={PostSubPicDummy} />
          </GridRow>
          <GridRow>
            <GridPic src={PostSubPicDummy} />
            <GridPic src={PostSubPicDummy} />
            <GridPic src={PostSubPicDummy} />
          </GridRow>
        </GridContainer>
        <ParticipantContainer>
          <HeadingParticipant>
            7명 참여중 / 이런 친구들이 참여했어요!
          </HeadingParticipant>
          <PParticipant>남 5 여 2 평균 나이 20초반</PParticipant>
          <AvartarImgContainerParticipant>
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
            <Avartar src={Avartar1} marginRight={"5px"} />
          </AvartarImgContainerParticipant>
          <PParticipant>참여 완료하면 프로필을 볼 수 있어요.</PParticipant>
        </ParticipantContainer>
        <ParticipantContainer>
          <HeadingParticipant>찾아오는 길</HeadingParticipant>
          <DirText>서울 강남구 강남대로 152길 42 2층</DirText>
        </ParticipantContainer>
        <Link
          to={routes.booking}
          style={{ textDecoration: "none", color: colors.Black }}
        >
          <BottomFixedButtonContainer>
            <BottomFixedButtoninContainer>
              <p>참여하기</p>
            </BottomFixedButtoninContainer>
          </BottomFixedButtonContainer>
        </Link>
        <SpaceForNavBar />
      </Container>
    </>
  );
}

const ContainerDescription = styled.div`
  margin-top: 27px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  size: 12px;
  color: #6f7789;
  position: relative;
`;

const DetailDescription = styled.div`
  position: absolute;
  bottom: -15px;
  right: 0;
`;

const GridContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

const GridRow = styled.div`
  margin-top: 6px;
  width: 100%;
  justify-content: space-between;
  display: flex;
`;

const GridPic = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
`;

const ParticipantContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 22px;
  line-height: 10px;
`;

const HeadingParticipant = styled.p`
  color: #18a0fb;
  font-weight: 700;
  font-size: 15px;
`;

const PParticipant = styled.p`
  margin-top: 22px;
  color: #8c94a4;
  font-size: 11px;
  font-weight: 400;
`;

const AvartarImgContainerParticipant = styled.div`
  margin-top: 11px;
`;

const DirText = styled.p`
  margin-top: 22px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  line-height: 150%;
  font-size: 11px;
`;
