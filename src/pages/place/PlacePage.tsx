import styled from "styled-components";
import {
  colors,
  Container,
  SpaceForNavBar,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
  Heading,
  SLink,
} from "../../styles";
import { RouteComponentProps } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { faMapMarkerAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getPlaceById } from "../../lib/api/getPlaceById";
import type { PlaceData } from "../../lib/api/types";
import { AgeNumberToString, encodeUrlSlug } from "../../lib/utils";
import Avatar from "../../components/shared/Avatar";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import useUrlQuery from "../../hooks/useUrlQuery";
import { useQuery } from "react-query";
import queryString from "query-string";

const kakao = window.kakao;
declare global {
  interface Window {
    kakao: any;
  }
}

interface MatchParmas {
  placeId: string;
}

interface Props extends RouteComponentProps<MatchParmas> {}

export default function PlacePage({ match, location, history }: Props) {
  const { placeId } = match.params;
  const UrlSearch = location.search;
  const isFinal = Boolean(queryString.parse(UrlSearch).isFinal === "true");
  const isClosed = Boolean(queryString.parse(UrlSearch).isClosed === "true");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [placeId]);

  const { data: placeData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", placeId],
    () => getPlaceById(placeId),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const mapTimer = setTimeout(() => {
      displayMap();
    }, 1500);
    return () => {
      clearTimeout(mapTimer);
    };
  }, []);

  const displayMap = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 5,
    };
    if (!container) return;

    let map = new kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  };

  if (!placeData) return null;

  return (
    <Container>
      {/* Cover Image */}
      <SHeader>
        <SHeaderPic src={placeData.coverImage} />
        <TempToBeDeleted></TempToBeDeleted>
        <HeaderText>
          <BackButton onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" />
          </BackButton>
          <SHeaderCategoryIndicator>
            {(JSON.parse(placeData.placeDetail.categories) as string[]).join(
              ", "
            )}
          </SHeaderCategoryIndicator>
          <SHeaderTextHeading>{placeData.name}</SHeaderTextHeading>
          <HeaderSplit></HeaderSplit>
          <SHeaderTextDescription>
            {placeData.startDateFromNow} 오후 4시 / 오후 7시
            <br />
            {placeData.recommendation}
          </SHeaderTextDescription>
        </HeaderText>
      </SHeader>

      {/* Desccription  */}
      <DescriptionContainer>
        <h3>{placeData.placeDetail.title}</h3>
        <p> {placeData.placeDetail.description}</p>

        <DetailDescription>
          <p>가게 정보 더보기</p>
        </DetailDescription>
      </DescriptionContainer>

      {/* Album  */}
      <GridContainer>
        {placeData.placeDetail.photos.map((photo) => (
          <GridPic key={photo} src={photo} />
        ))}
      </GridContainer>

      {/* Participants */}
      <ParticipantContainer>
        <HeadingParticipant>
          {placeData.participantsCount}명 참여중 / 이런 친구들이 참여했어요!
        </HeadingParticipant>
        <PParticipant>
          남 {placeData.participantsInfo.male_count} 여{" "}
          {placeData.participantsInfo.total_count -
            placeData.participantsInfo.male_count}{" "}
          평균 나이 {AgeNumberToString(placeData.participantsInfo.average_age)}
        </PParticipant>
        <AvartarImgContainerParticipant
          isParticipating={placeData.isParticipating}
        >
          {placeData.participants.map((participant) => (
            <Avatar
              key={participant.userId}
              profileImgUrl={participant.profileImgUrl}
              rightOffset={"5px"}
            />
          ))}
        </AvartarImgContainerParticipant>
        <PParticipant>참가 전 학교 인증은 필수입니다.</PParticipant>
      </ParticipantContainer>

      {/* Kakao Map */}
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
        />
      </ParticipantContainer>

      {/* Reservation Button */}

      {/* 코드 너무 더룸.. Link 를 따로 컴포넌트로 뺴야할듯 */}
      <BottomFixedButtonContainer>
        <CTABottomFixedButtoninContainer
          onClick={() =>
            !placeData.isParticipating &&
            history.push(`/reservation/${encodeUrlSlug(placeData.name)}`, {
              placeId,
            })
          }
          isParticipating={placeData.isParticipating}
          isFinal={isFinal}
          isClosed={isClosed}
          disabled={placeData.isParticipating || isClosed}
        >
          <p>
            {isClosed
              ? "마감 되었어요"
              : placeData.isParticipating
              ? "이미 참여한 써클이예요"
              : isFinal
              ? "오늘 마감! 참여하기"
              : "참여하기"}
          </p>
        </CTABottomFixedButtoninContainer>
      </BottomFixedButtonContainer>

      {isLoading && (
        <>
          <LoaderBackdrop />
          <LoaderWrapper>
            <ClipLoader
              loading={isLoading}
              color={colors.MidBlue}
              css={{
                name: "width",
                styles: "border-width: 4px; z-index: 999;",
              }}
              size={40}
            />
          </LoaderWrapper>
        </>
      )}

      <SpaceForNavBar />
    </Container>
  );
}

const CTABottomFixedButtoninContainer = styled(BottomFixedButtoninContainer)<{
  isParticipating: boolean;
  isFinal: boolean;
  isClosed: boolean;
}>`
  background-color: ${(props) =>
    props.isParticipating || props.isClosed
      ? "#A7B0C0"
      : props.isFinal
      ? "#FF2343"
      : "#18a0fb"};
`;

const DescriptionContainer = styled.div`
  margin: 27px 0 50px;
  width: 345px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  line-height: 150%;
  position: relative;
  font-size: 12px;
  line-height: 18px;
  h3 {
    font-weight: 700;
    color: #6f7789;
  }
  p {
    color: ${colors.MidGray};
    white-space: pre-line;
  }
`;

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 10px;
  background: rgba(25, 27, 26, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 14px;
  cursor: pointer;
`;

const DetailDescription = styled.div`
  position: absolute;
  bottom: -35px;
  right: 0;
  color: #a7b0c0;
  font-weight: bold;
`;

const SHeaderTextHeading = styled.h3`
  padding-bottom: 13px;
  font-size: 20px;
  font-weight: 800;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
  padding: 10px;
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
  margin-top: 31px;
  line-height: 10px;
`;

const HeadingParticipant = styled.p`
  color: #18a0fb;
  font-weight: 700;
  font-size: 15px;
`;

const PParticipant = styled.p`
  margin: 17px 0;
  color: #8c94a4;
  font-size: 11px;
  line-height: 14px;
  font-weight: 400;
`;

const AvartarImgContainerParticipant = styled.div<{ isParticipating: boolean }>`
  margin-top: 11px;
  filter: ${(props) => !props.isParticipating && "blur(1px)"};
`;

const DirText = styled.p`
  color: ${colors.LightGray};
  margin: 14px 0;
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

const SHeaderCategoryIndicator = styled.div`
  background: #18a0fb;
  color: #fff;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  padding: 5px 10px;
  margin: 15px 0;
  display: inline-block;
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
  color: #fff;
  position: absolute;
  bottom: 25px;
  left: 20px;
  width: 65%;
  h3,
  p {
    color: #fff;
  }
`;
