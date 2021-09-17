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
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { debug } from "console";

interface Props {
  // deadline: string;
  // imgUrl: string;
  // name: string;
  // date: string;
  // ageRange: {min?: number, max?: number};
  // tags: string[];
  // participants: string[];
  // participants_count: number;
  // isClosed: boolean;
  // isParticipating: boolean;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const kakao = window.kakao;

export default function PlacePage(props: Props) {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 5,
    };
    let map = new kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <>
      <Container>
        <SHeader>
          <SHeaderPic src={PostMainPicDummy} />

          <TempToBeDeleted></TempToBeDeleted>
          <HeaderText>
            <SHeaderTextHeading>안암 막걸리 찬가</SHeaderTextHeading>
            <HeaderSplit></HeaderSplit>
            <SHeaderTextDescription>
              내일 / 서울 용상구 보광로 60길 14-38 <br />
              20세~26세
            </SHeaderTextDescription>
          </HeaderText>
        </SHeader>

        <ContainerDescription>
          <p>
            새내기 미팅은 여기서!! 코로나 학번 모여라~~~
            <br />
            준비물은 청춘과 체력! 같이 이런저런 이야기 하면서 놀아요
            <br />
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
        <ParticipantContainer style={{ marginTop: "31px" }}>
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
          <PParticipant>참가 전 학교 인증은 필수입니다.</PParticipant>
        </ParticipantContainer>
        <ParticipantContainer style={{ marginTop: "25px" }}>
          <HeadingParticipant>찾아오는 길</HeadingParticipant>
          <DirText>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={colors.LightGray}
              size="lg"
              style={{ marginRight: "4px" }}
            />
            서울 강남구 강남대로 152길 42 2층
          </DirText>
          <div
            id="map"
            style={{
              width: "295px",
              height: "135px",
              marginTop: "17px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
        </ParticipantContainer>
        <Link
          to={routes.reservation}
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
  width: 345px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  line-height: 150%;
  color: #6f7789;
  position: relative;
`;

const DetailDescription = styled.div`
  position: absolute;
  bottom: -15px;
  right: 0;
`;

const GridContainer = styled.div`
  width: 345px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
`;

const GridRow = styled.div`
  margin-top: 6px;
  width: 100%;
  justify-content: space-between;
  display: flex;
`;

const GridPic = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
`;

const ParticipantContainer = styled.div`
  width: 345px;
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
  line-height: 14px;
  font-weight: 400;
`;

const AvartarImgContainerParticipant = styled.div`
  margin-top: 11px;
`;

const DirText = styled.p`
  color: ${colors.LightGray};
  margin-top: 22px;
  margin-left: auto;
  margin-right: auto;
  line-height: 150%;
  font-size: 11px;
`;

const TempToBeDeleted = styled.div`
  position: absolute;
  width: 375px;
  height: 250px;

  background: linear-gradient(
    180deg,
    rgba(8, 8, 8, 0) 0%,
    rgba(8, 8, 8, 0.1) 23.94%,
    rgba(8, 8, 8, 0.24) 34.55%,
    #191b1a 100%
  );
  border-radius: 0px;

  position: absolute;
  top: 0;
`;

const SHeaderTextHeading = styled.h3`
  padding-bottom: 13px;
  font-size: 20px;
  font-weight: 800;
`;

const SHeaderTextDescription = styled.p`
  margin-top: 13px;
  font-size: 10px;
  font-weight: 500;
  line-height: 150%;
`;

const HeaderSplit = styled.div`
  width: 180px;
  border-bottom: 1px solid white;
`;

const SHeader = styled.div`
  width: 100%;
  position: relative;
`;

const SHeaderPic = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const HeaderText = styled.div`
  color: white;
  position: absolute;
  bottom: 25px;
  left: 20px;
  width: 65%;
`;
