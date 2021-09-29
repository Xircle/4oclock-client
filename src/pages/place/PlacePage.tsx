import styled from "styled-components";
import {
  colors,
  Container,
  SpaceForNavBar,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
} from "../../styles/styles";
import { RouteComponentProps } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { faMapMarkerAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getPlaceById } from "../../lib/api/getPlaceById";
import type { PlaceData } from "../../lib/api/types";
import {
  AgeNumberToString,
  CalculateCloseDate,
  encodeUrlSlug,
} from "../../lib/utils";
import Avatar from "../../components/shared/Avatar";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import { useQuery } from "react-query";
import queryString from "query-string";
import routes from "../../routes";
import Modal from "../../components/UI/Modal";
import PageTitle from "../../components/PageTitle";
import useFullscreen from "../../hooks/useFullscreen";

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
  const scrollToProfile = Boolean(
    queryString.parse(UrlSearch).scrollToProfile === "true"
  );
  const { data: placeData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", placeId],
    () => getPlaceById(placeId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  // Scroll Conditionally
  useEffect(() => {
    if (scrollToProfile) {
      document.getElementById("participant")?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    searchAddress(placeData?.placeDetail.detailAddress);
  }, [placeData?.placeDetail.detailAddress]);

  const searchAddress = (address: string | undefined) => {
    if (!address) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        displayMap(result);
      }
    };
    geocoder.addressSearch(address, callback);
  };

  const displayMap = (result: any) => {
    if (!placeData?.placeDetail.detailAddress) return;
    const latitude = result[0].y;
    const longitude = result[0].x;
    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const coords = new kakao.maps.LatLng(latitude, longitude);

    // 결과값으로 받은 위치를 마커로 표시합니다
    new kakao.maps.Marker({
      map,
      position: coords,
    });

    map.setCenter(coords);
  };

  if (isLoading)
    return (
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
            size={30}
          />
        </LoaderWrapper>
      </>
    );
  if (!placeData) return null;

  return (
    <Container>
      <PageTitle title="맛집 정보" />

      {/* Cover Image */}
      <SHeader
        onClick={() => {
          history.push(`/image/${0}`, {
            profileImageUrls: [placeData.coverImage],
          });
        }}
      >
        <SHeaderPic src={placeData.coverImage} alt={placeData.name + "사진"} />
        <TempToBeDeleted></TempToBeDeleted>
        <HeaderText>
          <SHeaderCategoryIndicator>
            {placeData.participantsCount}명 신청중
          </SHeaderCategoryIndicator>
          {placeData.startDateFromNow != "NA" && (
            <SHeaderCategoryIndicator style={{ marginLeft: "10px" }}>
              {CalculateCloseDate(placeData.startDateFromNow)}
            </SHeaderCategoryIndicator>
          )}
          <SHeaderTextHeading>{placeData.name}</SHeaderTextHeading>
          <SHeaderTextDescription>
            {placeData.oneLineIntroText}
          </SHeaderTextDescription>
        </HeaderText>
      </SHeader>

      {/* Recommendation */}
      <PlaceSummaryInformation>
        <span>{placeData.recommendation}</span> 나이만 참여가능해요.
        <br />
        <span>{placeData.startDateFromNow} 오후 4시와 7시에</span> 열리는 모임이
        있어요.
      </PlaceSummaryInformation>

      {/* Desccription  */}
      <DescriptionContainer>
        <h3 style={{ fontSize: "13px", margin: "3px 0", lineHeight: "18px" }}>
          {placeData.placeDetail.title}
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "18px" }}>
          {" "}
          {placeData.placeDetail.description}
        </p>

        <DetailDescription>
          <a href={placeData.placeDetail.detailLink} target="_blank">
            맛집 정보 더보기
          </a>
        </DetailDescription>
      </DescriptionContainer>

      {/* Album  */}
      <GridContainer>
        {placeData.placeDetail.photos.map((photo, index) => (
          <GridPic
            key={photo}
            src={photo}
            onClick={() =>
              history.push(`/image/${index}`, {
                profileImageUrls: placeData.placeDetail.photos,
              })
            }
          />
        ))}
      </GridContainer>

      {/* Participants */}
      <Section id="participant">
        <PrimaryText>
          현재 {placeData.participantsCount}명의 친구들이 신청했어요!
        </PrimaryText>
        <DescriptionText>
          <b>프로필을 클릭</b>해서 신청한 친구들의 정보를 구경해보세요!
        </DescriptionText>
        <PParticipantContainer>
          <PParticipant>
            남 {placeData.participantsInfo.male_count}{" "}
          </PParticipant>
          <PParticipant MarginLeft={"10px"}>
            여{" "}
            {placeData.participantsInfo.total_count -
              placeData.participantsInfo.male_count}
          </PParticipant>
          <PParticipant MarginLeft={"10px"}>
            평균 나이{" "}
            {AgeNumberToString(placeData.participantsInfo.average_age)}
          </PParticipant>
        </PParticipantContainer>
        <AvartarImgContainerParticipant
          isParticipating={placeData.isParticipating}
        >
          {placeData.participants.map((participant) => (
            <Avatar
              key={participant.userId}
              profileImgUrl={participant.profileImgUrl}
              width="46px"
              rightOffset={"8px"}
              onClick={() =>
                placeData.isParticipating
                  ? history.push(`${routes.participantProfile}`, {
                      id: participant.userId,
                    })
                  : history.push(
                      `/participants-list/${encodeUrlSlug(placeData.name)}`,
                      {
                        placeId,
                      }
                    )
              }
            />
          ))}
        </AvartarImgContainerParticipant>
      </Section>

      {/* 모임 안내 */}

      <Section>
        <PrimaryText>#모임안내</PrimaryText>
        <Row>
          <span className="Top01">자세한 정보를 알려드릴게요</span>
        </Row>
        <Row>
          <span className="bold">시간</span>
          <span>
            {placeData.startDateFromNow} 오후 4시(4인) / 오후 7시(2인) 모임 중
            택1
          </span>
        </Row>
        <Row>
          <span className="bold">장소</span>
          <span>{placeData.placeDetail.detailAddress}</span>
        </Row>

        <Row>
          <span className="bold">나이</span>
          <span>{placeData.recommendation}</span>
        </Row>

        <Row>
          <span className="bold">참가비</span>
          <span>무료</span>
        </Row>

        <Row>
          <span className="Info">
            <strong>(중요)</strong> 같은 시간대를 신청한 친구들과{" "}
            <strong> 4인/2인 매칭해서 단톡</strong>을 만들어드려요! 단톡링크는
            모임 전날 적어주신 전화번호로 보내드릴게요 :)
          </span>
        </Row>
      </Section>

      {/* Kakao Map */}
      <Section style={{ marginTop: "25px", border: "none" }}>
        <PrimaryText>찾아오는 길</PrimaryText>
        <DirText>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color={colors.LightGray}
            size="lg"
            style={{ marginRight: "4px" }}
          />
          {placeData.placeDetail.detailAddress}
        </DirText>
        <div
          id="map"
          style={{
            width: "295px",
            height: "175px",
            marginTop: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
          }}
        />
      </Section>

      {/* Reservation Button */}
      {/* 코드 너무 더룸.. Link 를 따로 컴포넌트로 뺴야할듯 */}
      <BottomFixedButtonContainer>
        <CTABottomFixedButtoninContainer
          onClick={() =>
            !placeData.isParticipating &&
            history.push(`/reservation/${encodeUrlSlug(placeData.name)}`, {
              placeId,
              startDateFromNow: placeData.startDateFromNow,
              detailAddress: placeData.placeDetail.detailAddress,
              recommendation: placeData.recommendation,
              participationFee: placeData.placeDetail.participationFee,
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
              ? "이미 참여신청된 모임이예요"
              : isFinal
              ? "오늘 마감! 맛집 놀러가기"
              : "맛집 놀러가기"}
          </p>
        </CTABottomFixedButtoninContainer>
      </BottomFixedButtonContainer>

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
  margin: 23px 0 50px;
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
  margin-bottom: 5px;
  background: rgba(25, 27, 26, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 14px;
  cursor: pointer;
`;

const DetailDescription = styled.div`
  position: absolute;
  bottom: -35px;
  right: 0;
  a {
    color: #a7b0c0;
    font-weight: bold;
    text-decoration: none;
  }
`;

const SHeaderTextHeading = styled.h3`
  padding-bottom: 5px;
  font-size: 24px;
  font-weight: 800;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
  background-color: #fff;
  color: #444;
  padding: 16px;
  padding-top: 10px;
`;

const GridPic = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
  cursor: pointer;
`;

export const Section = styled.div`
  margin: 0 auto;
  padding: 31px 20px 20px;
  line-height: 19px;
  border-bottom: 0.5px solid #e7ecf3;
`;

export const PrimaryText = styled.p`
  color: #18a0fb;
  font-weight: 700;
  font-size: 15px;
`;

const DescriptionText = styled.p`
  color: #8c94a4;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  margin: 15px 0 0;
  b {
    font-weight: bold;
  }
`;

const PParticipantContainer = styled.div`
  margin-top: 15px;
`;

const PParticipant = styled.span<{ MarginLeft?: string }>`
  margin-left: ${(props) => props.MarginLeft || "0"};
  color: #6f7789;
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
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
  height: 230px;

  background: linear-gradient(
    180deg,
    rgba(8, 8, 8, 0) 0%,
    rgba(8, 8, 8, 0.1) 23.94%,
    rgba(8, 8, 8, 0.24) 34.55%,
    #191b1a 110%
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
  margin: 12px 0;
  display: inline-block;
`;

const SHeaderTextDescription = styled.p`
  font-size: 11px;
  font-weight: 500;
  line-height: 150%;
`;

const HeaderSplit = styled.div`
  width: 180px;
  border-bottom: 1px solid white;
`;

const SHeader = styled.div`
  height: 230px;
  position: relative;
  cursor: pointer;
`;

const SHeaderPic = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

const HeaderText = styled.div`
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 65%;
  h3,
  p {
    color: #fff;
  }
`;

const PlaceSummaryInformation = styled.div`
  background-color: #dbedff;
  color: #18a0fb;
  padding: 15px 20px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  border-radius: 5px 5px 0 0;
  transform: translate(0, -5px);
  span {
    font-weight: 700;
    color: #18a0fb;
  }
`;

export const Row = styled.div`
  display: flex;
  span {
    color: #6f7789;
    font-size: 13px;
    line-height: 19px;
  }
  .bold {
    font-weight: 700;
    margin-right: 8px;
  }
  .Top01 {
    font-size: 13px;
    line-height: 16px;
    color: #8c94a4;
    margin: 12px 0 10px;
  }
  .Info {
    color: #18a0fb;
    margin: 18px 0;
  }
  strong {
    font-weight: 700;
  }
`;
