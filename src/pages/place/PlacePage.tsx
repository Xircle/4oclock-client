import styled from "styled-components";
import {
  colors,
  Container,
  SpaceForNavBar,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
  MainBtn,
} from "../../styles/styles";
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
import { useQuery } from "react-query";
import queryString from "query-string";
import routes from "../../routes";
import Modal from "../../components/UI/Modal";
import PageTitle from "../../components/PageTitle";

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
  const myPlace = Boolean(queryString.parse(UrlSearch).myPlace === "true");
  const [reservationClicked, setReservationClicked] = useState(false);

  const { data: placeData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", placeId],
    () => getPlaceById(placeId),
    {
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
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = {
      position: markerPosition,
    };
    const staticMapContainer = document.getElementById("staticMap"),
      staticMapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
        marker: marker,
      };
    new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
  };

  const toggleShowModal = () => {
    setReservationClicked(!reservationClicked);
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
            size={40}
          />
        </LoaderWrapper>
      </>
    );
  if (!placeData) return null;

  return (
    <Container>
      <PageTitle title="식탁 정보" />

      {/* Cover Image */}
      <SHeader>
        <SHeaderPic src={placeData.coverImage} />
        <TempToBeDeleted></TempToBeDeleted>
        <HeaderText>
          <BackButton
            onClick={() =>
              myPlace ? history.goBack() : history.replace(routes.placeFeed)
            }
          >
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
        <h3 style={{ fontSize: "14px", margin: "3px 0", lineHeight: "23px" }}>
          {placeData.placeDetail.title}
        </h3>
        <p style={{ fontSize: "14px" }}> {placeData.placeDetail.description}</p>

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
      <ParticipantContainer id="participant">
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
              onClick={() =>
                placeData.isParticipating &&
                history.push(`${routes.participantProfile}`, {
                  id: participant.userId,
                })
              }
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
          {placeData.placeDetail.detailAddress}
        </DirText>
        <div
          id="staticMap"
          style={{
            width: "295px",
            height: "190px",
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
          onClick={() => setReservationClicked(true)}
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

      {reservationClicked && (
        <Modal isClose={!reservationClicked} onClose={toggleShowModal}>
          <ModalWrapper>
            <h1>
              현재는 특정 학교로만 <br /> 운영되고 있어요!
            </h1>
            <span>
              학교인증이 되어야 모임을 참가하실 수 있어요! 참가신청을 하시면
              개별적으로 학교 인증 연락을 드릴게요!
            </span>
            <MainBtn
              onClick={() =>
                !placeData.isParticipating &&
                history.push(`/reservation/${encodeUrlSlug(placeData.name)}`, {
                  placeId,
                  startDateFromNow: placeData.startDateFromNow,
                })
              }
              style={{ width: "150px" }}
            >
              계속하기
            </MainBtn>
            <p
              onClick={() => setReservationClicked(false)}
              className="cancleBtn"
            >
              취소하기
            </p>
          </ModalWrapper>
        </Modal>
      )}

      <SpaceForNavBar />
    </Container>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 10px;
  h1 {
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    color: #12121d;
  }
  span {
    font-size: 14px;
    line-height: 22px;
    color: #a7b0c0;
    padding: 0 40px;
  }
  .cancleBtn {
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
    color: #a7b0c0;
    cursor: pointer;
  }
`;

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
  color: #a7b0c0;
  font-weight: bold;
`;

const SHeaderTextHeading = styled.h3`
  padding-bottom: 11px;
  font-size: 20px;
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
`;

const ParticipantContainer = styled.div`
  width: 345px;
  margin: 31px auto 50px;
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
  font-size: 12px;
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
  margin-top: 11px;
  font-size: 12px;
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
